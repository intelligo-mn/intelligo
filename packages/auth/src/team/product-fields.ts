/**
 * A product's own fields on an invitation, copied onto the membership
 * when it is accepted: what the inviter says the member is to the
 * workspace, which the framework stores and never reads.
 */

import { db } from "@intelligo-dev/core/db";
import { invitation, member } from "@intelligo-dev/core/db/schema";
import { and, eq } from "drizzle-orm";

/** Keeps `fields` on an invitation the workspace just sent; nothing when there are none. */
export async function keep(
  invitationId: string | undefined,
  workspaceId: string,
  fields: Record<string, string> | undefined
): Promise<void> {
  if (!invitationId || !fields) return;
  await db
    .update(invitation)
    .set({ productFields: fields })
    .where(
      and(
        eq(invitation.id, invitationId),
        eq(invitation.organizationId, workspaceId)
      )
    );
}

/** Copies an accepted invitation's fields onto the membership it made. */
export async function copy(
  invitationId: string,
  workspaceId: string,
  userId: string
): Promise<void> {
  const [accepted] = await db
    .select({ productFields: invitation.productFields })
    .from(invitation)
    .where(eq(invitation.id, invitationId))
    .limit(1);
  if (!accepted?.productFields) return;
  await db
    .update(member)
    .set({ productFields: accepted.productFields })
    .where(
      and(eq(member.organizationId, workspaceId), eq(member.userId, userId))
    );
}

/**
 * The product fields a member's accepted invitation carried
 * (`inviteMember`'s `productFields`), or null for a member who joined
 * another way — the workspace's creator, or an invitation without them.
 * The caller scopes the read: it takes a resolved workspace and user.
 */
export async function memberProductFields(actor: {
  workspaceId: string;
  userId: string;
}): Promise<Record<string, string> | null> {
  const [row] = await db
    .select({ productFields: member.productFields })
    .from(member)
    .where(
      and(
        eq(member.organizationId, actor.workspaceId),
        eq(member.userId, actor.userId)
      )
    )
    .limit(1);
  return row?.productFields ?? null;
}
