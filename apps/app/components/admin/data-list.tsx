"use client";

/**
 * A console list: the registry's DataTable with its toolbar, filter chips
 * and pagination, and the RecordPanel beside it. Its state lives in the
 * URL (`q`, `page`, `size`, `sort`, `order`, one parameter per facet,
 * `open` for the row in the panel), so the server page re-reads the same
 * query, renders the rows and — when a row is open — the panel's body,
 * and a list can be linked to as it stands.
 *
 * Rows cross the server boundary as plain cells (text, a badge, a note
 * under it), never as render functions; the server writes dates, numbers
 * and money into them already formatted. Copy comes from the
 * `admin-console` namespace's `list`, `panel` and `properties` keys.
 */

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";

import {
  DataTable,
  DataTableFilterChips,
  DataTablePagination,
  DataTableToolbar,
  type DataTableColumn,
  type DataTableFacet,
  type DataTableLabels,
} from "@/components/ui/data-table";
import type { PropertyListLabels } from "@/components/ui/property-list";
import {
  RecordPanel,
  type RecordPanelLabels,
} from "@/components/ui/record-panel";
import { Spinner } from "@/components/ui/spinner";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Tone } from "@/components/admin/panel";

export type { Tone };

/** The data table's copy, in the reader's language. */
export function useTableLabels(): Partial<DataTableLabels> {
  const t = useTranslations("admin-console.list");
  return useMemo(
    () => ({
      search: t("search"),
      noResults: t("noResults"),
      rowsPerPage: t("rowsPerPage"),
      previousPage: t("previousPage"),
      nextPage: t("nextPage"),
      pageOf: (page: number, pages: number) => t("pageOf", { page, pages }),
      results: (total: number) => t("results", { total }),
      columns: t("columns"),
      density: t("density"),
      compact: t("compact"),
      comfortable: t("comfortable"),
      sortAscending: t("sortAscending"),
      sortDescending: t("sortDescending"),
      hideColumn: t("hideColumn"),
      selectAll: t("selectAll"),
      selectRow: t("selectRow"),
      actions: t("actions"),
      filters: t("filters"),
      clear: t("clear"),
      reset: t("reset"),
      noOptions: t("noOptions"),
    }),
    [t]
  );
}

/** The record panel's copy, in the reader's language. */
export function usePanelLabels(): Partial<RecordPanelLabels> {
  const t = useTranslations("admin-console.panel");
  return useMemo(
    () => ({
      previous: t("previous"),
      next: t("next"),
      fullPage: t("fullPage"),
    }),
    [t]
  );
}

/** The property list's copy, in the reader's language. */
export function usePropertyLabels(): Partial<PropertyListLabels> {
  const t = useTranslations("admin-console.properties");
  return useMemo(
    () => ({
      empty: t("empty"),
      yes: t("yes"),
      no: t("no"),
      showEmpty: (count: number) => t("showEmpty", { count }),
      hideEmpty: t("hideEmpty"),
    }),
    [t]
  );
}

export interface ListColumn {
  key: string;
  header: string;
  sortKey?: string;
  className?: string;
}

export type ListCell =
  | string
  | {
      text: string;
      /** A word in a badge after the text: the row's state, in its tone. */
      badge?: string;
      tone?: Tone;
      /** A second, muted line. */
      note?: string;
      mono?: boolean;
    };

export interface ListRow {
  id: string;
  cells: Record<string, ListCell>;
}

/** The URL as the list's state: every change is a navigation the server page answers. */
export function useListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const set = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      const query = next.toString();
      startTransition(() =>
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        })
      );
    },
    [params, pathname, router]
  );
  return { params, set, pending };
}

/**
 * Tabs whose choice is the URL's `?tab=`, so a tab can be linked to and
 * survives a refresh. Changing tab starts its list on the first page with
 * no row open.
 */
export function UrlTabs({
  initial,
  children,
}: {
  initial: string;
  children: ReactNode;
}) {
  const { params, set } = useListParams();
  return (
    <Tabs
      value={params.get("tab") ?? initial}
      onValueChange={(tab) => set({ tab: String(tab), page: null, open: null })}
    >
      {children}
    </Tabs>
  );
}

function Cell({ cell }: { cell: ListCell | undefined }) {
  if (cell === undefined || cell === "")
    return <span className="text-muted-foreground">—</span>;
  if (typeof cell === "string")
    return <span className="whitespace-normal">{cell}</span>;
  return (
    <div className="flex min-w-0 flex-col gap-0.5 whitespace-normal">
      <span className={cell.mono ? "font-mono text-xs" : undefined}>
        {cell.text}
        {cell.badge && (
          <StatusBadge
            status={cell.tone ?? "neutral"}
            className={cell.text ? "ml-1.5 align-middle" : undefined}
          >
            {cell.badge}
          </StatusBadge>
        )}
      </span>
      {cell.note && (
        <span data-secondary className="text-xs text-muted-foreground">
          {cell.note}
        </span>
      )}
    </div>
  );
}

export interface DataListProps {
  columns: ListColumn[];
  rows: ListRow[];
  total: number;
  page: number;
  pageSize: number;
  search?: string;
  sort?: string | null;
  order?: "asc" | "desc";
  facets?: DataTableFacet[];
  filters?: Record<string, string[]>;
  /** The row open in the panel, and the body the server rendered for it. */
  openId?: string | null;
  panel?: ReactNode;
  panelTitle?: ReactNode;
  panelDescription?: ReactNode;
  panelActions?: ReactNode;
  panelFooter?: ReactNode;
  /** The open row's own page. */
  fullPageHref?: string;
  /** Columns hidden until the reader asks for them. */
  hidden?: string[];
  /** Controls after the column menu: the page's primary action. */
  toolbar?: ReactNode;
  empty?: ReactNode;
  /** The search box's hint, when "Search…" says too little. */
  searchPlaceholder?: string;
  /**
   * Rows can be chosen, and `bulk` renders the actions for the chosen ones
   * (approve, reject…) in a bar above the list. A client caller only: it is
   * a function. The choice clears when the page of rows changes.
   */
  bulk?: (ids: string[], clear: () => void) => ReactNode;
}

/** The chosen rows, kept only while they are the rows on screen. */
function useChosen(rows: ListRow[]) {
  const [chosen, setChosen] = useState<{ ids: Set<string>; of: ListRow[] }>({
    ids: new Set(),
    of: rows,
  });
  const selected = chosen.of === rows ? chosen.ids : new Set<string>();
  const choose = useCallback(
    (ids: Set<string>) => setChosen({ ids, of: rows }),
    [rows]
  );
  const clear = useCallback(
    () => setChosen({ ids: new Set(), of: rows }),
    [rows]
  );
  return { selected, choose, clear };
}

/**
 * The row in the panel: the one clicked, ahead of the server's answer, so
 * the panel opens at once; once the answer lands (or names no such row),
 * the server's `openId` is the truth again.
 */
function useOpening(openId: string | null) {
  const { set, pending } = useListParams();
  const [clicked, setClicked] = useState<{
    id: string | null;
    from: string | null;
  } | null>(null);
  const opening = pending && clicked?.from === openId ? clicked.id : openId;
  const open = useCallback(
    (id: string | null) => {
      setClicked({ id, from: openId });
      set({ open: id });
    },
    [set, openId]
  );
  return { opening, open, set, pending };
}

export function DataList(props: DataListProps) {
  const {
    columns,
    rows,
    total,
    page,
    pageSize,
    search = "",
    sort = null,
    order = "asc",
    facets = [],
    filters = {},
    openId = null,
    hidden = [],
    toolbar,
    empty,
    bulk,
  } = props;
  const labels = useTableLabels();
  const { opening, open, set, pending } = useOpening(openId);
  const { selected, choose, clear } = useChosen(rows);
  const [visible, setVisible] = useState(() =>
    columns.map((c) => c.key).filter((k) => !hidden.includes(k))
  );
  const [density, setDensity] = useState<"compact" | "comfortable">(
    "comfortable"
  );

  const tableColumns = useMemo<DataTableColumn<ListRow>[]>(
    () =>
      columns
        .filter((c) => visible.includes(c.key))
        .map((c) => ({
          key: c.key,
          header: c.header,
          sortKey: c.sortKey,
          className: c.className,
          cell: (row: ListRow) => <Cell cell={row.cells[c.key]} />,
        })),
    [columns, visible]
  );

  const filtersActive =
    search !== "" || Object.values(filters).some((v) => v.length > 0);
  const onSearch = (q: string) => set({ q, page: null });
  const onFilter = (key: string, values: string[]) =>
    set({ [key]: values.join(","), page: null });

  return (
    // Fills what the page leaves it, but never less than a screenful of
    // rows: a page with panels above or below the list scrolls instead of
    // squeezing the list to a line.
    <div className="flex min-h-112 flex-1 flex-col gap-2">
      <DataTableToolbar
        search={search}
        onSearch={onSearch}
        facets={facets}
        filters={filters}
        onFilter={onFilter}
        columns={columns}
        visible={visible}
        onVisibleChange={setVisible}
        pinnedKey={columns[0]?.key}
        density={density}
        onDensityChange={setDensity}
        labels={
          props.searchPlaceholder
            ? { ...labels, search: props.searchPlaceholder }
            : labels
        }
      >
        {toolbar}
      </DataTableToolbar>
      {filtersActive && (
        <DataTableFilterChips
          search={search}
          onSearch={onSearch}
          facets={facets}
          filters={filters}
          onFilter={onFilter}
          onReset={() =>
            set({
              q: null,
              page: null,
              ...Object.fromEntries(Object.keys(filters).map((k) => [k, null])),
            })
          }
          labels={labels}
        />
      )}
      {bulk && selected.size > 0 && (
        <BulkBar count={selected.size}>{bulk([...selected], clear)}</BulkBar>
      )}
      <DataTable
        columns={tableColumns}
        rows={rows}
        rowKey={(row) => row.id}
        sort={sort}
        order={order}
        onSort={(key, direction) =>
          set({ sort: key, order: direction, page: null })
        }
        onRowClick={(row) => open(row.id)}
        activeRowKey={opening}
        selectedKeys={bulk ? selected : undefined}
        onSelectedChange={bulk ? choose : undefined}
        onHideColumn={(key) =>
          setVisible((keys) => keys.filter((k) => k !== key))
        }
        density={density}
        pending={pending && !opening}
        empty={empty}
        labels={labels}
        footer={
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={(p) => set({ page: p > 1 ? String(p) : null })}
            onPageSizeChange={(size) => set({ size: String(size), page: null })}
            labels={labels}
          />
        }
      />
      <ListPanel {...props} opening={opening} open={open} />
    </div>
  );
}

function BulkBar({ count, children }: { count: number; children: ReactNode }) {
  const t = useTranslations("admin-console.list");
  return (
    <div
      role="toolbar"
      aria-label={t("selectedRows")}
      className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-3 py-1.5 text-sm"
    >
      <span className="font-medium tabular-nums">
        {t("selected", { count })}
      </span>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  );
}

function ListPanel({
  rows,
  openId = null,
  panel,
  panelTitle,
  panelDescription,
  panelActions,
  panelFooter,
  fullPageHref,
  opening,
  open,
}: DataListProps & {
  opening: string | null;
  open: (id: string | null) => void;
}) {
  const labels = usePanelLabels();
  const index = opening ? rows.findIndex((r) => r.id === opening) : -1;
  const previous = index > 0 ? rows[index - 1] : undefined;
  const next =
    index >= 0 && index < rows.length - 1 ? rows[index + 1] : undefined;
  const loaded = opening !== null && opening === openId;
  return (
    <RecordPanel
      open={opening !== null}
      onClose={() => open(null)}
      title={loaded ? (panelTitle ?? "") : ""}
      description={loaded ? panelDescription : undefined}
      onPrevious={previous ? () => open(previous.id) : undefined}
      onNext={next ? () => open(next.id) : undefined}
      fullPageHref={loaded ? fullPageHref : undefined}
      LinkComponent={Link}
      actions={loaded ? panelActions : undefined}
      footer={loaded ? panelFooter : undefined}
      labels={labels}
    >
      {loaded ? (
        panel
      ) : (
        <div className="flex h-40 items-center justify-center">
          <Spinner />
        </div>
      )}
    </RecordPanel>
  );
}
