/**
 * Where client data enters the framework, as an inventory a new door
 * cannot slip past. Every place that reads a request body is listed in
 * INGRESS with what it does with it, and every server-action parameter
 * that is not a plain string is listed in ACTIONS with the class of check
 * its value gets, and must show that check in the action's body. A
 * destructured or rest parameter fails outright: it has no one name the
 * check could be found by.
 *
 * The scan is syntax only. It proves a door is declared and that a check
 * of the declared kind is there, not that the check is right: the
 * behavioural suites (packages/registry/tests/action-inputs.test.ts, the
 * chat transport's body tests) prove that.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  exportedActions,
  parse,
  registryActionModules,
  REGISTRY_BASE,
  type ActionModule,
} from "./server-actions";
import { listWorkspaces, PACKAGES_DIR, ROOT, walk } from "./tree";

/** Each request-body reader, by `<file> <enclosing function>`. */
const INGRESS: Record<string, string> = {
  "packages/chat/src/read-body.ts readUpTo":
    "the bounded reader: a declared or streamed size over the limit stops the read",
  "packages/chat/src/read-body.ts readJsonUpTo":
    "the bounded reader, parsed as JSON; the caller decides what any field means",
  "packages/chat/src/handler.ts POST":
    "readJsonUpTo, then parseChatBody before anything else reads it (checked below)",
  "packages/chat/src/handler.ts DELETE":
    "a conversation id from the query or the JSON body, to a tenant-scoped deleteConversation",
  "packages/chat/src/attachments.ts POST":
    "readUpTo, then multipart: policy.accept, maxBytes and a safe file name; the id is made on the server",
  "packages/billing/src/webhook-route.ts POST":
    "the raw text, whose Stripe signature is checked before any field is read",
  "apps/app/app/api/assistant/route.ts POST":
    "the reference product's own route: a prompt string",
};

/**
 * Routes that receive client data and are not scanned, each with why.
 * Every path must exist, so a moved route has to be declared again.
 */
const DECLARED_OUT_OF_SCOPE: Record<string, string> = {
  "apps/app/app/api/auth/[...all]/route.ts":
    "Better-Auth's handlers read their bodies inside the library; the framework's field guard is additionalFields input: false (packages/auth/src/server.ts), and users.role is the admin plugin's",
  "apps/app/app/api/cron/maintenance/route.ts":
    "a withCronSecret GET: the secret header is all it reads",
  "apps/app/app/api/payments/local/settle/route.ts":
    "a withCronSecret GET: the secret header is all it reads",
};

/** How a server-action parameter's value is checked. */
type Check =
  /** `typeof p === "boolean"`. */
  | "flag"
  /** Compared with literals, or looked up in a list of them. */
  | "choice"
  /** Handed first to a parser: `parseX(p)`, `schema.parse(p)`, `.safeParse(p)`. */
  | "object"
  /** Clamped: an argument to `clamp…`, `Math.min` or `Math.max`. */
  | "count"
  /** A form action's previous state, which the action never reads. */
  | "unread";

/** Each server-action parameter that is not a string, by `<item>/<file> <action>.<param>`. */
const ACTIONS: Record<string, Check> = {
  "admin-console/actions.ts grantPlanAction._prev": "unread",
  "admin-console/actions.ts grantPlanAction.formData": "object",
  "admin-console/actions.ts creditAction._prev": "unread",
  "admin-console/actions.ts creditAction.formData": "object",
  "admin-console/actions.ts impersonateAction._prev": "unread",
  "admin-console/actions.ts impersonateAction.formData": "object",
  "admin-console/actions.ts updateBillingSettingsAction._prev": "unread",
  "admin-console/actions.ts updateBillingSettingsAction.formData": "object",
  "chat/actions.ts setConversationPinned.pinned": "flag",
  "chat/actions.ts voteMessage.vote": "choice",
  "chat/actions.ts setConversationShared.shared": "flag",
  "chat/actions.ts saveMessageAsArtifact.params": "object",
  "chat/actions.ts saveArtifactVersion.params": "object",
  "notifications/actions.ts getNotifications.limit": "count",
  "notifications/actions.ts getUnreadNotifications.limit": "count",
  "onboarding/actions.ts advanceStep.input": "object",
  "pricing/actions.ts createCheckoutSession.input": "object",
  "pricing/actions.ts createCreditPurchaseSession.input": "object",
  "profile-settings/actions.ts updateProfile.input": "object",
  "team-settings/actions.ts inviteMember.input": "object",
  "team-settings/actions.ts updateMemberRole.input": "object",
  "usage/actions.ts getUsagePeriodSummary.period": "choice",
  "workspace-settings/actions.ts updateWorkspace.input": "object",
};

/**
 * The check a parameter's declared type calls for, by the type's text.
 * An object literal type, a union of literals and a name ending in
 * `Input` or `Params` are recognised without an entry.
 */
const TYPE_CHECK: Record<string, Check> = {
  boolean: "flag",
  number: "count",
  FormData: "object",
  ActionResult: "unread",
  UsagePeriod: "choice",
};

// --- Body readers ----------------------------------------------------

const BODY_METHODS = new Set([
  "json",
  "formData",
  "text",
  "arrayBuffer",
  "blob",
  "bytes",
]);
const BODY_READERS = new Set(["readUpTo", "readJsonUpTo"]);
const REQUEST_TYPES = new Set(["Request", "NextRequest"]);

/** The name a reader is listed under: its nearest named enclosing function. */
function enclosingName(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at; at = at.parent) {
    if (
      (ts.isFunctionDeclaration(at) ||
        ts.isMethodDeclaration(at) ||
        ts.isFunctionExpression(at)) &&
      at.name
    ) {
      return at.name.getText();
    }
    if (
      (ts.isArrowFunction(at) || ts.isFunctionExpression(at)) &&
      (ts.isPropertyAssignment(at.parent) ||
        ts.isVariableDeclaration(at.parent))
    ) {
      return at.parent.name.getText();
    }
  }
  return "(module)";
}

/** `request`, `req`, or a name declared as a `Request` parameter in the file. */
function requestNames(source: ts.SourceFile): Set<string> {
  const names = new Set(["request", "req"]);
  const visit = (node: ts.Node) => {
    if (
      ts.isParameter(node) &&
      ts.isIdentifier(node.name) &&
      node.type &&
      REQUEST_TYPES.has(node.type.getText())
    ) {
      names.add(node.name.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}

/** `request` itself, or `request.clone()`. */
function isRequest(node: ts.Expression, names: Set<string>): boolean {
  if (ts.isIdentifier(node)) return names.has(node.text);
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "clone" &&
    isRequest(node.expression.expression, names)
  );
}

/** The body readers in a file, as `<file> <name>` keys. */
function bodyReaders(file: string, source: ts.SourceFile): Set<string> {
  const names = requestNames(source);
  const found = new Set<string>();
  const visit = (node: ts.Node) => {
    const reads =
      (ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        BODY_METHODS.has(node.expression.name.text) &&
        isRequest(node.expression.expression, names)) ||
      (ts.isPropertyAccessExpression(node) &&
        node.name.text === "body" &&
        isRequest(node.expression, names)) ||
      (ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        BODY_READERS.has(node.expression.text));
    if (reads) found.add(`${file} ${enclosingName(node)}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

const toPosix = (full: string) =>
  path.relative(ROOT, full).split(path.sep).join("/");
const isSource = (name: string) =>
  /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name);

/**
 * Package source, registry items, and the files the reference app owns.
 * The app's other files are installed copies of registry items, which
 * are scanned at their source.
 */
function scannedFiles(): string[] {
  const packages = listWorkspaces(PACKAGES_DIR)
    .filter((name) => name !== "registry")
    .flatMap((name) => walk(path.join(PACKAGES_DIR, name, "src"), isSource));
  const registry = walk(REGISTRY_BASE, isSource);
  const owned = Object.keys(
    (
      JSON.parse(
        readFileSync(
          path.join(ROOT, "scripts/reference-app-owned.json"),
          "utf8"
        )
      ) as { files: Record<string, string> }
    ).files
  )
    .filter(isSource)
    .map((file) => path.join(ROOT, "apps/app", file));
  return [...packages, ...registry, ...owned]
    .filter((full) => !full.split(path.sep).includes("__tests__"))
    .map(toPosix)
    .sort();
}

function readersIn(files: string[]): Set<string> {
  const found = new Set<string>();
  for (const file of files) {
    const text = readFileSync(path.join(ROOT, file), "utf8");
    for (const key of bodyReaders(file, parse(file, text))) found.add(key);
  }
  return found;
}

// --- Server-action parameters ----------------------------------------

type Param = {
  key: string;
  name: string;
  type: ts.TypeNode | undefined;
  body: ts.Node;
  /** Destructured or rest: no one name the body's check can be found by. */
  unnamed: boolean;
};

const isStringType = (text: string | undefined) =>
  text === undefined || text === "string" || text === "string | undefined";

/**
 * The parameters of a module's actions that are not plain strings. A
 * destructured or rest parameter is always one, whatever its type says.
 */
function nonStringParams(module: ActionModule): Param[] {
  const item = module.file.slice(
    toPosix(REGISTRY_BASE).length + 1 // the item's own path
  );
  return exportedActions(module.source).flatMap((action) =>
    action.node.parameters.flatMap((parameter) => {
      const body = action.node.body;
      if (!body) return [];
      const type = parameter.type;
      const unnamed =
        !ts.isIdentifier(parameter.name) ||
        parameter.dotDotDotToken !== undefined;
      if (!unnamed && isStringType(type?.getText().replace(/\s+/g, " "))) {
        return [];
      }
      const name = parameter.name.getText().replace(/\s+/g, " ");
      const shown = parameter.dotDotDotToken ? `${name} (rest)` : name;
      return [
        { key: `${item} ${action.name}.${shown}`, name, type, body, unnamed },
      ];
    })
  );
}

/** Each destructured or rest parameter, which ACTIONS cannot declare. */
const unnamedParams = (found: Param[]) =>
  found.filter((param) => param.unnamed).map((param) => param.key);

const isLiteralType = (node: ts.TypeNode) =>
  ts.isLiteralTypeNode(node) ||
  node.kind === ts.SyntaxKind.NullKeyword ||
  node.kind === ts.SyntaxKind.UndefinedKeyword;

/** The check a declared type calls for, or null when the type is unknown here. */
function checkFor(type: ts.TypeNode | undefined): Check | null {
  if (!type) return null;
  if (ts.isTypeLiteralNode(type)) return "object";
  if (ts.isUnionTypeNode(type) && type.types.every(isLiteralType)) {
    return "choice";
  }
  const text = type.getText();
  if (text in TYPE_CHECK) return TYPE_CHECK[text]!;
  if (/(Input|Params)$/.test(text)) return "object";
  return null;
}

/** Every reference to `name` in `body`, in source order. */
function references(body: ts.Node, name: string): ts.Identifier[] {
  const out: ts.Identifier[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isIdentifier(node) && node.text === name) {
      const parent = node.parent;
      const isMemberName =
        (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
        (ts.isPropertyAssignment(parent) && parent.name === node);
      if (!isMemberName) out.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(body);
  return out;
}

const EQUALITY = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
]);

const isLiteralValue = (node: ts.Expression) =>
  ts.isStringLiteral(node) ||
  ts.isNumericLiteral(node) ||
  node.kind === ts.SyntaxKind.NullKeyword;

/** The calls `node` is inside an argument of, innermost first, within its function. */
function argumentOf(node: ts.Node): ts.CallExpression[] {
  const calls: ts.CallExpression[] = [];
  for (let at: ts.Node = node; at.parent; at = at.parent) {
    const parent = at.parent;
    if (
      ts.isCallExpression(parent) &&
      parent.arguments.includes(at as ts.Expression)
    ) {
      calls.push(parent);
    }
    if (ts.isFunctionLike(parent)) break;
  }
  return calls;
}

const calleeText = (call: ts.CallExpression) => call.expression.getText();

/** Whether `body` shows the check `check` on parameter `name`. */
function isChecked(body: ts.Node, name: string, check: Check): boolean {
  const refs = references(body, name);
  switch (check) {
    case "unread":
      return refs.length === 0;
    case "flag":
      return refs.some((ref) => {
        const typeOf = ref.parent;
        if (!ts.isTypeOfExpression(typeOf)) return false;
        const compare = typeOf.parent;
        return (
          ts.isBinaryExpression(compare) &&
          EQUALITY.has(compare.operatorToken.kind) &&
          ts.isStringLiteral(
            compare.left === typeOf ? compare.right : compare.left
          ) &&
          (compare.left === typeOf ? compare.right : compare.left).getText() ===
            '"boolean"'
        );
      });
    case "choice":
      return refs.some((ref) => {
        const parent = ref.parent;
        if (
          ts.isBinaryExpression(parent) &&
          EQUALITY.has(parent.operatorToken.kind)
        ) {
          return isLiteralValue(
            parent.left === ref ? parent.right : parent.left
          );
        }
        return (
          ts.isCallExpression(parent) &&
          parent.arguments[0] === ref &&
          /\.(includes|has)$/.test(calleeText(parent))
        );
      });
    case "object": {
      const first = refs[0];
      return (
        first !== undefined &&
        argumentOf(first).some((call) =>
          /^parse[A-Z]\w*$|\.(safeParse|parse)$/.test(calleeText(call))
        )
      );
    }
    case "count":
      return refs.some((ref) =>
        argumentOf(ref).some((call) =>
          /^clamp\w*$|^Math\.(min|max)$/.test(calleeText(call))
        )
      );
  }
}

// --- The inventory ----------------------------------------------------

const files = scannedFiles();
const readers = readersIn(files);
const params = registryActionModules().flatMap(nonStringParams);

describe("every client body reader is declared", () => {
  it("scans the packages, the registry and the app's own files", () => {
    expect(files.length).toBeGreaterThan(300);
    expect(files).toContain("apps/app/app/api/assistant/route.ts");
  });

  it("lists every body reader in INGRESS", () => {
    expect(
      [...readers].filter((key) => !(key in INGRESS)),
      "reads a request body with no INGRESS entry: add it with what checks the body before it is used"
    ).toEqual([]);
  });

  it("lists no reader that is gone", () => {
    expect(Object.keys(INGRESS).filter((key) => !readers.has(key))).toEqual([]);
  });

  it("names out-of-scope routes that exist", () => {
    expect(
      Object.keys(DECLARED_OUT_OF_SCOPE).filter(
        (file) => !existsSync(path.join(ROOT, file))
      )
    ).toEqual([]);
  });

  it("gives every entry a reason", () => {
    const blank = Object.entries({ ...INGRESS, ...DECLARED_OUT_OF_SCOPE })
      .filter(([, reason]) => reason.trim().length < 10)
      .map(([key]) => key);
    expect(blank).toEqual([]);
  });
});

describe("the chat POST reads its body through parseChatBody", () => {
  const file = "packages/chat/src/handler.ts";
  const source = parse(file, readFileSync(path.join(ROOT, file), "utf8"));

  function postBody(): ts.Block {
    let found: ts.Block | undefined;
    const visit = (node: ts.Node) => {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name?.text === "POST" &&
        node.body
      ) {
        found = node.body;
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    if (!found) throw new Error(`no POST function in ${file}`);
    return found;
  }

  it("uses the read only to refuse it or to parse it", () => {
    const body = postBody();
    const bindings: string[] = [];
    const visit = (node: ts.Node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        ts.isAwaitExpression(node.initializer) &&
        ts.isCallExpression(node.initializer.expression) &&
        node.initializer.expression.expression.getText() === "readJsonUpTo"
      ) {
        bindings.push(node.name.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(body);
    expect(bindings).toHaveLength(1);
    const read = bindings[0]!;

    const misuse = references(body, read)
      .filter((ref) => !ts.isVariableDeclaration(ref.parent))
      .filter((ref) => {
        const parent = ref.parent;
        if (
          ts.isBinaryExpression(parent) &&
          EQUALITY.has(parent.operatorToken.kind)
        ) {
          const other = parent.left === ref ? parent.right : parent.left;
          return !(
            ts.isStringLiteral(other) &&
            ["too_large", "invalid"].includes(other.text)
          );
        }
        if (
          ts.isPropertyAccessExpression(parent) &&
          parent.name.text === "json" &&
          ts.isCallExpression(parent.parent) &&
          parent.parent.arguments[0] === parent &&
          parent.parent.expression.getText() === "parseChatBody"
        ) {
          return false;
        }
        return true;
      })
      .map(
        (ref) =>
          `${file}:${source.getLineAndCharacterOfPosition(ref.getStart()).line + 1}`
      );
    expect(
      misuse,
      "the read body is used before parseChatBody has checked it"
    ).toEqual([]);
  });
});

describe("every server-action input is declared and checked", () => {
  it("finds the actions' non-string parameters", () => {
    expect(params.length).toBeGreaterThan(15);
  });

  it("lists every non-string parameter in ACTIONS", () => {
    expect(
      unnamedParams(params),
      "destructures or spreads a client value: take it as one named parameter, check it, then read its fields"
    ).toEqual([]);
    expect(
      params
        .filter((param) => !param.unnamed)
        .map((param) => param.key)
        .filter((key) => !(key in ACTIONS)),
      "takes a non-string value from the client with no ACTIONS entry: add it with the check its value gets"
    ).toEqual([]);
  });

  it("lists no parameter that is gone", () => {
    const keys = new Set(params.map((param) => param.key));
    expect(Object.keys(ACTIONS).filter((key) => !keys.has(key))).toEqual([]);
  });

  it("declares the check its type calls for", () => {
    const mismatched = params
      .filter((param) => param.key in ACTIONS)
      .flatMap((param) => {
        const expected = checkFor(param.type);
        if (expected === null) {
          return [
            `${param.key}: no check known for type ${param.type?.getText()} — add it to TYPE_CHECK`,
          ];
        }
        return expected === ACTIONS[param.key]
          ? []
          : [
              `${param.key}: ${ACTIONS[param.key]}, but its type is a ${expected}`,
            ];
      });
    expect(mismatched).toEqual([]);
  });

  it("shows that check in the action's body", () => {
    const unchecked = params
      .filter((param) => param.key in ACTIONS)
      .filter(
        (param) => !isChecked(param.body, param.name, ACTIONS[param.key]!)
      )
      .map((param) => `${param.key} (${ACTIONS[param.key]})`);
    expect(unchecked).toEqual([]);
  });
});

describe("the ingress scan", () => {
  const readersOf = (source: string) =>
    [...bodyReaders("fixture.ts", parse("fixture.ts", source))].sort();

  it("finds a body read on a request however it is named", () => {
    expect(
      readersOf(`
export async function POST(request: Request) {
  return Response.json(await request.text());
}
export const handlers = {
  PUT: async (incoming: Request) => incoming.clone().formData(),
};
async function stream(req: Request) {
  return req.body?.getReader();
}
function bounded(r: Request) {
  return readUpTo(r, 10);
}
async function ignored(response: Response) {
  return response.json();
}
export function createHandler() {
  return async function DELETE(request: Request) {
    const read = await request.json();
    return read;
  };
}`)
    ).toEqual([
      "fixture.ts DELETE",
      "fixture.ts POST",
      "fixture.ts PUT",
      "fixture.ts bounded",
      "fixture.ts stream",
    ]);
  });

  const checked = (source: string, name: string, check: Check) => {
    const fn = parse("fixture.ts", source).statements.find(
      ts.isFunctionDeclaration
    )!;
    return isChecked(fn.body!, name, check);
  };

  it("tells a check from a use", () => {
    expect(
      checked(
        `async function a(p: boolean) { if (typeof p !== "boolean") return; save(p); }`,
        "p",
        "flag"
      )
    ).toBe(true);
    expect(
      checked(`async function a(p: boolean) { save({ p }); }`, "p", "flag")
    ).toBe(false);
    expect(
      checked(
        `async function a(p: Period) { if (!PERIODS.includes(p)) return; }`,
        "p",
        "choice"
      )
    ).toBe(true);
    expect(
      checked(`async function a(p: Period) { read(p); }`, "p", "choice")
    ).toBe(false);
    expect(
      checked(
        `async function a(p: Input) { const v = schema.safeParse(p); use(p); }`,
        "p",
        "object"
      )
    ).toBe(true);
    expect(
      checked(
        `async function a(p: Input) { use(p.x); parseInput(p); }`,
        "p",
        "object"
      )
    ).toBe(false);
    expect(
      checked(
        `async function a(n: number) { get(clampLimit(n)); }`,
        "n",
        "count"
      )
    ).toBe(true);
    expect(
      checked(`async function a(n: number) { get(n); }`, "n", "count")
    ).toBe(false);
    expect(
      checked(
        `async function a(_prev: State) { go(_prev); }`,
        "_prev",
        "unread"
      )
    ).toBe(false);
  });

  it("reports a destructured or rest parameter however it is typed", () => {
    const file = `${toPosix(REGISTRY_BASE)}/fixture/actions.ts`;
    const found = nonStringParams({
      file,
      source: parse(
        file,
        `"use server";
export async function named(id: string, flag: boolean) {}
export async function destructured({ a, b }: { a: unknown; b: number }) {}
export async function untyped([first]) {}
export async function spread(...ids: string[]) {}`
      ),
    });
    expect(unnamedParams(found)).toEqual([
      "fixture/actions.ts destructured.{ a, b }",
      "fixture/actions.ts untyped.[first]",
      "fixture/actions.ts spread.ids (rest)",
    ]);
    expect(found.filter((param) => !param.unnamed).map((p) => p.key)).toEqual([
      "fixture/actions.ts named.flag",
    ]);
  });
});
