/**
 * A point-in-time snapshot of what the film's beats name — registry item
 * groups, the framework package ids `pnpm add` lists, and the version
 * that types into the terminal. Source of truth if this ever needs a
 * refresh: packages/registry/registry.json (item names/groups, via
 * apps/website/src/lib/registry-items.ts's GROUPS map). The version is
 * read when the film renders, from the site's proof.json — a rendered
 * video keeps the version it was rendered at.
 */

import proof from "../../../apps/website/src/data/proof.json";

export type RegistryGroup = "Auth" | "Shell" | "Settings" | "Commerce" | "AI";

const GROUPS: Record<RegistryGroup, string[]> = {
  Auth: [
    "auth-login",
    "auth-signup",
    "auth-password-reset",
    "auth-email-verification",
    "onboarding",
    "invitation-accept",
  ],
  Shell: [
    "app-shell",
    "dashboard",
    "notifications",
    "language-switcher",
    "trial-banner",
    "route-error",
  ],
  Settings: [
    "settings-shell",
    "workspace-settings",
    "team-settings",
    "profile-settings",
    "privacy-settings",
  ],
  Commerce: [
    "pricing",
    "checkout",
    "billing-settings",
    "usage",
    "feature-gating",
    "payment-poll",
  ],
  AI: ["chat", "chat-panel", "chat-widget", "chat-share", "artifacts"],
};

export type RegistryItem = { name: string; group: RegistryGroup };

export const REGISTRY_ITEMS: RegistryItem[] = (
  Object.keys(GROUPS) as RegistryGroup[]
).flatMap((group) => GROUPS[group].map((name) => ({ name, group })));

/** The framework layer of the package map, in `pnpm add` order. */
export const PACKAGES = [
  "auth",
  "billing",
  "chat",
  "next",
  "executions",
  "core",
  "audit",
  "jobs",
  "admin",
];

/** The version npm serves when the film is rendered, as the site states it. */
export const PACKAGE_VERSION: string = proof.published;
