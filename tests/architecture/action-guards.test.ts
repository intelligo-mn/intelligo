/**
 * A server action is a public endpoint: anyone who can reach the app
 * can call it with any arguments. Every action a registry item ships
 * must therefore reach an auth guard — directly, through a helper in
 * its own module, or through a service that guards itself — or be
 * listed here as public with the reason it may run for anyone.
 *
 * This proves a guard is called, not that it is called first or with
 * the right roles; the integration suites prove what a guard refuses.
 */

import { describe, expect, it } from "vitest";

import {
  calledNames,
  exportedActions,
  importBindings,
  parse,
  registryActionModules,
  topLevelFunctions,
  type ActionModule,
} from "./server-actions";

/** Functions that refuse a caller who is not signed in, or not allowed. */
const GUARDS = new Set([
  "@intelligo-dev/auth#requireAuth",
  "@intelligo-dev/auth#requireWorkspace",
  "@intelligo-dev/auth#requireRole",
  "@intelligo-dev/admin#requirePlatformAdmin",
  "@intelligo-dev/admin#requireAdminOrRefuse",
]);

/** Bindings whose every call resolves and checks the caller itself. */
const GUARDED_SERVICES: Record<string, string> = {
  "@intelligo-dev/auth#restoreAccount":
    "refuses without a session, and a session older than the deletion or an impersonated one",
  "@intelligo-dev/admin#startImpersonation":
    "requireAdminOrRefuse before anything else",
  "@/lib/team#team":
    "createTeamService: every method resolves the actor with requireAuth, requireWorkspace or requireRole, except getUserInvitations, which Better-Auth's own session check refuses",
  "@/lib/workspace#workspace":
    "createWorkspaceService: every method resolves the actor with requireAuth, requireWorkspace or requireRole",
  "@/lib/profile#profile":
    "createProfileService: every method resolves the user with requireAuth",
  "@/lib/onboarding-profile#profile":
    "createProfileService: every method resolves the user with requireAuth",
  "@/lib/onboarding#onboarding":
    "createOnboardingService: every method resolves the user with requireAuth",
};

/** Actions anyone may call, by `<file>#<export>`. */
const PUBLIC: Record<string, string> = {
  "packages/registry/base/chat-share/actions.ts#loadSharedConversation":
    "a public share link: the reader is optional, and the conversation's visibility decides what it returns",
};

type Verdict = { action: string; reached: string[] };

/**
 * Each exported action of `module` and the guards or guarded services
 * it reaches, following calls into the module's own functions.
 */
function guardsReached(module: ActionModule): Verdict[] {
  const imports = importBindings(module.source);
  const locals = new Map(
    topLevelFunctions(module.source).map((fn) => [fn.name, fn.node])
  );

  return exportedActions(module.source).map((action) => {
    const reached = new Set<string>();
    const seen = new Set<string>([action.name]);
    const queue = [action.node];
    while (queue.length > 0) {
      for (const name of calledNames(queue.pop()!)) {
        const local = locals.get(name);
        if (local) {
          if (!seen.has(name)) {
            seen.add(name);
            queue.push(local);
          }
          continue;
        }
        const binding = imports.get(name);
        if (!binding) continue;
        const key = `${binding.specifier}#${binding.imported}`;
        if (GUARDS.has(key) || key in GUARDED_SERVICES) reached.add(key);
      }
    }
    return { action: `${module.file}#${action.name}`, reached: [...reached] };
  });
}

function unguarded(verdicts: Verdict[]): string[] {
  return verdicts
    .filter((verdict) => verdict.reached.length === 0)
    .filter((verdict) => !(verdict.action in PUBLIC))
    .map((verdict) => verdict.action);
}

const modules = registryActionModules();
const verdicts = modules.flatMap(guardsReached);

describe("every server action reaches an auth guard", () => {
  it("finds the registry's server actions", () => {
    expect(modules.length).toBeGreaterThan(10);
    expect(verdicts.length).toBeGreaterThan(40);
  });

  it("guards each action, or lists it as public with a reason", () => {
    expect(
      unguarded(verdicts),
      "reaches no guard: call requireAuth/requireWorkspace/requireRole (or a helper that does), or list it in PUBLIC with why anyone may call it"
    ).toEqual([]);
  });

  it("gives every exemption a reason", () => {
    const blank = Object.entries({ ...GUARDED_SERVICES, ...PUBLIC })
      .filter(([, reason]) => reason.trim().length < 10)
      .map(([key]) => key);
    expect(blank).toEqual([]);
  });

  it("lists no public action that no longer exists or now has a guard", () => {
    const byAction = new Map(verdicts.map((v) => [v.action, v.reached]));
    const stale = Object.keys(PUBLIC).filter(
      (action) => (byAction.get(action) ?? ["(missing)"]).length > 0
    );
    expect(stale).toEqual([]);
  });

  it("lists no guarded service that no action calls", () => {
    const used = new Set(verdicts.flatMap((verdict) => verdict.reached));
    expect(
      Object.keys(GUARDED_SERVICES).filter((key) => !used.has(key))
    ).toEqual([]);
  });
});

describe("the guard check", () => {
  const judge = (source: string) =>
    unguarded(
      guardsReached({ file: "fixture.ts", source: parse("fixture.ts", source) })
    );

  it("fails an action that calls no guard", () => {
    expect(
      judge(`"use server";
import { listConversations } from "@intelligo-dev/core/conversations";
export async function list(workspaceId: string) {
  return listConversations({ workspaceId, userId: "" }, { limit: 10 });
}`)
    ).toEqual(["fixture.ts#list"]);
  });

  it("fails an action whose only call is an unlisted @/lib helper", () => {
    expect(
      judge(`"use server";
import { store } from "@/lib/store";
export async function save(value: string) {
  await store.put(value);
}`)
    ).toEqual(["fixture.ts#save"]);
  });

  it("fails a local function that only shares a guard's name", () => {
    expect(
      judge(`"use server";
async function requireWorkspace() {
  return { workspace: { id: "w" } };
}
export async function read() {
  return requireWorkspace();
}`)
    ).toEqual(["fixture.ts#read"]);
  });

  it("passes a guard reached through a local helper or an alias", () => {
    expect(
      judge(`"use server";
import { requireWorkspace as guard } from "@intelligo-dev/auth";
import { restoreAccount as restore } from "@intelligo-dev/auth";
async function actor() {
  const { workspace } = await guard();
  return workspace.id;
}
export async function read() {
  return actor();
}
export const restoreIt = async () => {
  await restore();
};`)
    ).toEqual([]);
  });
});
