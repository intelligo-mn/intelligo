"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon, ExpandIcon } from "lucide-react";

import { Button } from "@showcase/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@showcase/components/ui/sheet";
import { cn } from "@showcase/lib/utils";

export interface RecordPanelLabels {
  previous: string;
  next: string;
  fullPage: string;
}

export const recordPanelLabels: RecordPanelLabels = {
  previous: "Previous record",
  next: "Next record",
  fullPage: "Open full page",
};

type LinkComponent = React.ComponentType<{
  href: string;
  children?: React.ReactNode;
  className?: string;
}>;

function DefaultLink({
  href,
  children,
  className,
}: React.ComponentProps<LinkComponent>) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export interface RecordPanelProps {
  open: boolean;
  onClose: () => void;
  /** The record's name, read out and shown at the top of the panel. */
  title: React.ReactNode;
  /** A line under the title: its kind, its state, where it came from. */
  description?: React.ReactNode;
  /** Steps to the neighbouring record of the list; omit at either end. */
  onPrevious?: () => void;
  onNext?: () => void;
  /** The same record on its own page. */
  fullPageHref?: string;
  LinkComponent?: LinkComponent;
  /** Actions for the record, at the top right beside the full-page link. */
  actions?: React.ReactNode;
  /** Pinned under the body: the record's primary decisions. */
  footer?: React.ReactNode;
  labels?: Partial<RecordPanelLabels>;
  className?: string;
  children: React.ReactNode;
}

/**
 * One record of a list, opened beside it: the list stays in place, ↑ and ↓
 * (or J and K) step through its rows, and the record can open on its own
 * page. The caller owns which record is open — usually a URL parameter — so
 * the panel survives a refresh and can be linked to.
 */
function RecordPanel({
  open,
  onClose,
  title,
  description,
  onPrevious,
  onNext,
  fullPageHref,
  LinkComponent,
  actions,
  footer,
  labels,
  className,
  children,
}: RecordPanelProps) {
  const l = { ...recordPanelLabels, ...labels };
  const Link = LinkComponent ?? DefaultLink;

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input,textarea,select,[contenteditable=true]"))
        return;
      if ((event.key === "ArrowUp" || event.key === "k") && onPrevious) {
        event.preventDefault();
        onPrevious();
      } else if ((event.key === "ArrowDown" || event.key === "j") && onNext) {
        event.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onPrevious, onNext]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <SheetContent
        side="right"
        data-slot="record-panel"
        className={cn(
          "gap-0 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-xl data-[side=right]:xl:max-w-3xl",
          className
        )}
      >
        <div className="flex h-12 shrink-0 items-center gap-1 border-b px-3 pr-12">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={l.previous}
            disabled={!onPrevious}
            onClick={onPrevious}
          >
            <ChevronUpIcon aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={l.next}
            disabled={!onNext}
            onClick={onNext}
          >
            <ChevronDownIcon aria-hidden />
          </Button>
          <div className="ml-auto flex items-center gap-2">
            {actions}
            {fullPageHref && (
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={fullPageHref} />}
              >
                <ExpandIcon data-icon="inline-start" aria-hidden />
                {l.fullPage}
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 px-5 pt-4 pb-3">
          <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : (
            <SheetDescription className="sr-only">{title}</SheetDescription>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          {children}
        </div>
        {footer && (
          <div className="flex shrink-0 items-center justify-end gap-2 border-t px-5 py-3">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { RecordPanel };
