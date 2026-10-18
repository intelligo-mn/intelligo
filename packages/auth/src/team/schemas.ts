/** Team inputs, shared by the team service and its transports. */

import { z } from "zod";

/**
 * A product's own fields on an invitation: a few short strings under
 * plain names, copied onto the membership when it is accepted.
 */
export const productFieldsSchema = z
  .record(z.string().regex(/^[a-z][a-zA-Z0-9_]{0,31}$/), z.string().max(200))
  .refine((fields) => Object.keys(fields).length <= 10, {
    message: "At most 10 product fields",
  });

export const inviteMemberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "member"], {
    // One message for a missing role and an unknown one: to the person
    // filling in the form they are the same mistake. `message`, not
    // `error`: the peer range admits zod 3, which reads only `message`.
    message: "Please select a role",
  }),
  productFields: productFieldsSchema.optional(),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

export const updateRoleSchema = z.object({
  memberId: z.string().min(1),
  role: z.enum(["admin", "member"]),
});

export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
