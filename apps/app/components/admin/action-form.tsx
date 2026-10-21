"use client";

/**
 * A form bound to a console server action. The action answers an
 * `ActionResult`: whether it worked and a fully-qualified message key,
 * with the values the message names. The answer shows as a toast, a
 * failure also under the form, and the page refreshes on success so the
 * change is visible.
 */

import { useTranslations } from "next-intl";
import { useActionState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { useRouter } from "@/i18n/navigation";

export type ActionResult = {
  ok: boolean;
  /** A fully-qualified message key, e.g. `admin-console.actions.planGranted`. */
  message: string;
  values?: Record<string, string | number | Date>;
} | null;

export interface ActionFormProps {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  /** The submit button's label. */
  submit: string;
  children?: ReactNode;
  variant?: "default" | "outline" | "destructive";
}

export function ActionForm({
  action,
  submit,
  children,
  variant = "default",
}: ActionFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, null);
  const text = state ? t(state.message, state.values) : "";

  useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(text);
      router.refresh();
    } else toast.error(text);
  }, [state, text, router]);

  return (
    <form action={formAction} className="grid gap-2">
      {children}
      <Button
        type="submit"
        size="sm"
        variant={variant}
        disabled={pending}
        className="w-fit"
      >
        {submit}
      </Button>
      {state && !state.ok && (
        <FieldError className="text-xs">{text}</FieldError>
      )}
    </form>
  );
}

/** A labelled control; the label wraps it, so the control needs no id. */
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <FieldLabel className="w-full flex-col items-stretch gap-1.5">
      <span className="text-xs font-normal text-muted-foreground">{label}</span>
      {children}
    </FieldLabel>
  );
}

/** A native `<select>` (it posts with the form, no client state) dressed as the registry `Input`. */
export const selectClass =
  "h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm outline-none hover:border-ring/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20";
