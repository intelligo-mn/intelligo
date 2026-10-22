/**
 * The registry's server actions, read as syntax: which files are
 * `"use server"` modules, the async functions each one exports, what
 * each name in a file is imported from, and what a function body calls.
 * A client can call every exported function of such a module directly,
 * so the architecture suites that judge an action start here.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";

import { PACKAGES_DIR, ROOT, walk } from "./tree";

export const REGISTRY_BASE = path.join(PACKAGES_DIR, "registry", "base");

const USE_SERVER = /^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*["']use server["']/;

/** Whether `source` is a module of server actions. */
export function isServerActions(source: string): boolean {
  return USE_SERVER.test(source);
}

export function parse(file: string, source: string): ts.SourceFile {
  return ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
}

export type ActionModule = {
  /** Repository-relative path. */
  file: string;
  source: ts.SourceFile;
};

/** Every `"use server"` module the registry's items ship. */
export function registryActionModules(): ActionModule[] {
  return walk(REGISTRY_BASE, (name) => /\.tsx?$/.test(name))
    .sort()
    .flatMap((full) => {
      const text = readFileSync(full, "utf8");
      if (!isServerActions(text)) return [];
      const file = path.relative(ROOT, full).split(path.sep).join("/");
      return [{ file, source: parse(file, text) }];
    });
}

/** A function with a body: a declaration, or a `const` bound to one. */
export type NamedFunction = {
  name: string;
  node: ts.FunctionLikeDeclaration;
  exported: boolean;
};

function isExported(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    (ts.getModifiers(node) ?? []).some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
    )
  );
}

function isAsync(node: ts.FunctionLikeDeclaration): boolean {
  return (ts.getModifiers(node) ?? []).some(
    (modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword
  );
}

/** The module's top-level functions, by name. */
export function topLevelFunctions(source: ts.SourceFile): NamedFunction[] {
  const out: NamedFunction[] = [];
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      if (!statement.body) continue;
      out.push({
        name: statement.name.text,
        node: statement,
        exported: isExported(statement),
      });
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        const init = declaration.initializer;
        if (
          ts.isIdentifier(declaration.name) &&
          init &&
          (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
        ) {
          out.push({
            name: declaration.name.text,
            node: init,
            exported: isExported(statement),
          });
        }
      }
    }
  }
  return out;
}

/** The exported async functions: what a client can call. */
export function exportedActions(source: ts.SourceFile): NamedFunction[] {
  return topLevelFunctions(source).filter(
    (fn) => fn.exported && isAsync(fn.node)
  );
}

/** Where a name in the module comes from: `local` → `{ specifier, imported }`. */
export function importBindings(
  source: ts.SourceFile
): Map<string, { specifier: string; imported: string }> {
  const out = new Map<string, { specifier: string; imported: string }>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly) continue;
    const specifier = (statement.moduleSpecifier as ts.StringLiteral).text;
    if (clause.name) {
      out.set(clause.name.text, { specifier, imported: "default" });
    }
    const bindings = clause.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings)) {
      out.set(bindings.name.text, { specifier, imported: "*" });
    } else if (bindings) {
      for (const element of bindings.elements) {
        if (element.isTypeOnly) continue;
        out.set(element.name.text, {
          specifier,
          imported: (element.propertyName ?? element.name).text,
        });
      }
    }
  }
  return out;
}

/**
 * The names `node` calls: `f()` gives `f`, and `a.b.c()` gives `a`, the
 * binding the call goes through.
 */
export function calledNames(node: ts.Node): Set<string> {
  const out = new Set<string>();
  const visit = (child: ts.Node) => {
    if (ts.isCallExpression(child)) {
      let callee: ts.Expression = child.expression;
      while (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee) ||
        ts.isCallExpression(callee) ||
        ts.isNonNullExpression(callee) ||
        ts.isParenthesizedExpression(callee)
      ) {
        callee = callee.expression;
      }
      if (ts.isIdentifier(callee)) out.add(callee.text);
    }
    ts.forEachChild(child, visit);
  };
  visit(node);
  return out;
}
