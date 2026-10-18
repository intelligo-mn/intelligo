/**
 * Sharing a conversation: the owner publishes it, and anyone holding its
 * link reads it without an account.
 */

import { and, asc, eq, isNull, or, sql } from "drizzle-orm";
import { db } from "../db";
import { conversations, member, messages, users } from "../db/schema";
import { ConversationServiceError } from "./errors";
import { getConversation } from "./service";
import type { Conversation, ConversationActor, Message } from "./types";

export type ConversationVisibility = "private" | "public";

/**
 * Who a share link opens for: anyone holding it (`public`, the default),
 * only signed-in members of the conversation's workspace (`workspace`),
 * or nobody, with sharing turned off (`off`). A product whose
 * conversations must not leave its tenants binds it once from the
 * composition root.
 */
export type ConversationSharing = "public" | "workspace" | "off";

let sharing: ConversationSharing = "public";

/** Sets who share links open for; bound once from the composition root. */
export function setConversationSharing(mode: ConversationSharing): void {
  sharing = mode;
}

/** Who share links open for (`setConversationSharing`). */
export function conversationSharing(): ConversationSharing {
  return sharing;
}

/**
 * Publish or unpublish a conversation. Public means readable by whoever
 * `conversationSharing()` lets hold its share link (`shareRef`). With
 * sharing off, publishing is refused (`sharing_off`); unpublishing
 * always works.
 */
export async function setConversationVisibility(
  actor: ConversationActor,
  id: string,
  visibility: ConversationVisibility
): Promise<Conversation> {
  await getConversation(actor, id);
  if (visibility === "public" && sharing === "off") {
    throw new ConversationServiceError(
      "sharing_off",
      "Conversation sharing is turned off"
    );
  }

  // Sharing an already public conversation keeps its link; sharing it
  // again after unsharing issues a new one, and unsharing forgets it.
  const shareToken =
    visibility === "public"
      ? sql`CASE WHEN ${conversations.visibility} = 'public' AND ${conversations.shareToken} IS NOT NULL THEN ${conversations.shareToken} ELSE ${newShareToken()} END`
      : null;

  const [updated] = await db
    .update(conversations)
    .set({ visibility, shareToken, updatedAt: new Date() })
    .where(eq(conversations.id, id))
    .returning();

  if (!updated) {
    throw new ConversationServiceError(
      "database_error",
      "Failed to update conversation visibility"
    );
  }

  return updated;
}

/** 18 random bytes, base64url: the part of a share link nobody can guess. */
function newShareToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * The public link's path segment for a conversation: its share token,
 * or its id when it was shared before conversations had tokens.
 */
export function shareRef(row: {
  id: string;
  shareToken: string | null;
}): string {
  return row.shareToken ?? row.id;
}

/**
 * A conversation its owner published, by its share link alone — no
 * actor, because the reader has none. `ref` is the share token; a
 * conversation shared before tokens existed, and not re-shared since,
 * still answers to its id. Everything else about the row stays
 * private: only what a shared page shows is projected.
 *
 * The link answers only while its author is a member of the
 * conversation's workspace and their account is not deleted: once they
 * leave, are removed, or delete their account, nobody is left who could
 * unshare it, so it stops being public by itself.
 *
 * With sharing off no link answers; with `workspace` sharing only a
 * `readerUserId` that is a member of the conversation's workspace gets
 * it. Anything else is `not_found`, as a link that names nothing.
 */
export async function getPublicConversation(
  ref: string,
  options: { readerUserId?: string | null } = {}
): Promise<{
  id: string;
  title: string | null;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}> {
  if (sharing === "off") {
    throw new ConversationServiceError("not_found", "Conversation not found");
  }
  const [row] = await db
    .select({
      id: conversations.id,
      workspaceId: conversations.workspaceId,
      title: conversations.title,
      agentId: conversations.agentId,
      createdAt: conversations.createdAt,
      updatedAt: conversations.updatedAt,
    })
    .from(conversations)
    .innerJoin(
      users,
      and(eq(users.id, conversations.userId), isNull(users.deletedAt))
    )
    .innerJoin(
      member,
      and(
        eq(member.userId, conversations.userId),
        eq(member.organizationId, conversations.workspaceId)
      )
    )
    .where(
      and(
        eq(conversations.visibility, "public"),
        or(
          eq(conversations.shareToken, ref),
          and(isNull(conversations.shareToken), eq(conversations.id, ref))
        )
      )
    )
    .limit(1);

  if (!row) {
    throw new ConversationServiceError("not_found", "Conversation not found");
  }
  if (sharing === "workspace") {
    const reader = options.readerUserId;
    const [isMember] = reader
      ? await db
          .select({ id: member.id })
          .from(member)
          .where(
            and(
              eq(member.userId, reader),
              eq(member.organizationId, row.workspaceId)
            )
          )
          .limit(1)
      : [];
    if (!isMember) {
      throw new ConversationServiceError("not_found", "Conversation not found");
    }
  }
  const { workspaceId: _workspaceId, ...shown } = row;
  return shown;
}

/**
 * The messages of a published conversation, by its share link, oldest
 * first. Throws `not_found` when the link names nothing the reader may
 * open (`getPublicConversation`).
 */
export async function getPublicMessages(
  ref: string,
  options: { readerUserId?: string | null } = {}
): Promise<Message[]> {
  const { id } = await getPublicConversation(ref, options);
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(asc(messages.createdAt));
}
