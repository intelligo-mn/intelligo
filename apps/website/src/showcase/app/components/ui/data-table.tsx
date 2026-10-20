"use client";

import * as React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  Columns3Icon,
  EllipsisIcon,
  EyeOffIcon,
  ListFilterIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { Badge } from "@showcase/components/ui/badge";
import { Button } from "@showcase/components/ui/button";
import { Checkbox } from "@showcase/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@showcase/components/ui/dropdown-menu";
import { Input } from "@showcase/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@showcase/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@showcase/components/ui/select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@showcase/components/ui/table";
import { cn } from "@showcase/lib/utils";

/**
 * A list the server pages, sorts and filters: the table never reorders or
 * slices rows itself. Every control reports a change through a callback and
 * the caller turns it into a new request — usually a URL change the page
 * re-reads — so the same list can be linked to, refreshed and shared.
 *
 * The pieces compose in a bounded flex column: the toolbar and its filter
 * chips above, `DataTable` filling the rest with its header pinned while the
 * rows scroll, and `DataTablePagination` passed as its `footer`.
 */

export type DataTableOrder = "asc" | "desc";
export type DataTableDensity = "compact" | "comfortable";

export interface DataTableColumn<Row> {
  key: string;
  header: string;
  /** The key the server sorts by; omit for a column that does not sort. */
  sortKey?: string;
  cell: (row: Row) => React.ReactNode;
  /** Classes for the column's cells, such as `text-right` or `whitespace-nowrap`. */
  className?: string;
}

export interface DataTableRowAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  destructive?: boolean;
}

export interface DataTableFacetOption {
  value: string;
  label: string;
}

/** A filter with a fixed set of options, several of which may be chosen. */
export interface DataTableFacet {
  key: string;
  label: string;
  options: DataTableFacetOption[];
}

export interface DataTableLabels {
  search: string;
  noResults: string;
  rowsPerPage: string;
  previousPage: string;
  nextPage: string;
  /** "Page {page} of {pages}". */
  pageOf: (page: number, pages: number) => string;
  /** "{total} results". */
  results: (total: number) => string;
  columns: string;
  density: string;
  compact: string;
  comfortable: string;
  sortAscending: string;
  sortDescending: string;
  hideColumn: string;
  selectAll: string;
  selectRow: string;
  actions: string;
  filters: string;
  clear: string;
  reset: string;
  noOptions: string;
}

export const dataTableLabels: DataTableLabels = {
  search: "Search…",
  noResults: "No results.",
  rowsPerPage: "Rows per page",
  previousPage: "Previous page",
  nextPage: "Next page",
  pageOf: (page, pages) => `Page ${page} of ${pages}`,
  results: (total) => `${total} results`,
  columns: "Columns",
  density: "Row height",
  compact: "Compact",
  comfortable: "Comfortable",
  sortAscending: "Ascending",
  sortDescending: "Descending",
  hideColumn: "Hide column",
  selectAll: "Select all",
  selectRow: "Select row",
  actions: "Actions",
  filters: "Filters",
  clear: "Clear",
  reset: "Reset",
  noOptions: "No options",
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

const labelsOf = (labels?: Partial<DataTableLabels>) => ({
  ...dataTableLabels,
  ...labels,
});

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  sort?: string | null;
  order?: DataTableOrder;
  onSort?: (sortKey: string, order: DataTableOrder) => void;
  /** A row opens its record, usually in a `RecordPanel`. */
  onRowClick?: (row: Row) => void;
  /** Without `onRowClick`, the first cell links here. */
  rowHref?: (row: Row) => string;
  LinkComponent?: LinkComponent;
  /** The row open in the panel, shown as selected. */
  activeRowKey?: string | null;
  /** Rows chosen for a bulk action; passing both turns on the checkbox column. */
  selectedKeys?: ReadonlySet<string>;
  onSelectedChange?: (keys: Set<string>) => void;
  rowActions?: (row: Row) => DataTableRowAction[];
  /** Leading columns that stay in place on a horizontal scroll. */
  pinned?: number;
  onHideColumn?: (key: string) => void;
  density?: DataTableDensity;
  /** A request for new rows is in flight: the rows dim until it lands. */
  pending?: boolean;
  /** Shown in place of the rows when there are none. */
  empty?: React.ReactNode;
  /** Under the rows, inside the card: the pagination. */
  footer?: React.ReactNode;
  labels?: Partial<DataTableLabels>;
  className?: string;
}

/**
 * The rows of a server-driven list. Keyboard: ↑ and ↓ move between rows,
 * Enter opens one, Space selects it.
 */
function DataTable<Row>({
  columns,
  rows,
  rowKey,
  sort = null,
  order = "asc",
  onSort,
  onRowClick,
  rowHref,
  LinkComponent,
  activeRowKey,
  selectedKeys,
  onSelectedChange,
  rowActions,
  pinned = 1,
  onHideColumn,
  density = "comfortable",
  pending = false,
  empty,
  footer,
  labels,
  className,
}: DataTableProps<Row>) {
  const l = labelsOf(labels);
  const Link = LinkComponent ?? DefaultLink;
  const cellY = density === "compact" ? "py-1.5" : "py-3";
  const selectable = selectedKeys !== undefined && onSelectedChange !== undefined;
  const keys = rows.map(rowKey);
  const allSelected =
    selectable && keys.length > 0 && keys.every((k) => selectedKeys.has(k));
  const someSelected =
    selectable && !allSelected && keys.some((k) => selectedKeys.has(k));
  const span = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);

  const toggle = (changed: string[], checked: boolean) => {
    if (!selectable) return;
    const next = new Set(selectedKeys);
    for (const key of changed) {
      if (checked) next.add(key);
      else next.delete(key);
    }
    onSelectedChange(next);
  };

  const onRowKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    row: Row,
    key: string
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const sibling =
        event.key === "ArrowDown"
          ? event.currentTarget.nextElementSibling
          : event.currentTarget.previousElementSibling;
      (sibling as HTMLElement | null)?.focus();
    } else if (event.key === "Enter" && onRowClick) {
      event.preventDefault();
      onRowClick(row);
    } else if (event.key === " " && selectable) {
      event.preventDefault();
      toggle([key], !selectedKeys.has(key));
    }
  };

  return (
    <div
      data-slot="data-table"
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-card",
        className
      )}
    >
      <div className="min-h-0 flex-1 overflow-auto">
        <table
          className={cn(
            "w-full caption-bottom text-sm",
            rows.length === 0 && "h-full"
          )}
        >
          <TableHeader className="sticky top-0 z-20 bg-card">
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {selectable && (
                <TableHead className="h-9 w-10 pr-0 pl-4">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={(checked) => toggle(keys, checked === true)}
                    aria-label={l.selectAll}
                  />
                </TableHead>
              )}
              {columns.map((column, index) => (
                <TableHead
                  key={column.key}
                  aria-sort={
                    column.sortKey
                      ? sort === column.sortKey
                        ? order === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                      : undefined
                  }
                  className={cn(
                    "h-9",
                    index === 0 && !selectable && "pl-4",
                    index < pinned &&
                      !selectable &&
                      "sticky left-0 z-10 bg-muted/40",
                    column.className
                  )}
                >
                  <DataTableColumnHeader
                    title={column.header}
                    sortKey={column.sortKey}
                    sort={sort}
                    order={order}
                    onSort={onSort}
                    onHide={
                      onHideColumn && index >= pinned
                        ? () => onHideColumn(column.key)
                        : undefined
                    }
                    labels={labels}
                  />
                </TableHead>
              ))}
              {rowActions && (
                <TableHead className="h-9 w-10 pr-4">
                  <span className="sr-only">{l.actions}</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody
            aria-busy={pending || undefined}
            className={cn(
              "transition-opacity",
              pending && "opacity-60",
              density === "compact" && "[&_[data-secondary]]:hidden"
            )}
          >
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={span}
                  className={cn(
                    empty ? "p-0" : "h-24 text-center text-muted-foreground"
                  )}
                >
                  {empty ?? l.noResults}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const key = rowKey(row);
                const href = onRowClick ? undefined : rowHref?.(row);
                const selected = selectable && selectedKeys.has(key);
                const focusable = Boolean(onRowClick) || selectable;
                return (
                  <TableRow
                    key={key}
                    data-state={
                      selected || activeRowKey === key ? "selected" : undefined
                    }
                    tabIndex={focusable ? 0 : undefined}
                    onKeyDown={
                      focusable
                        ? (event) => onRowKeyDown(event, row, key)
                        : undefined
                    }
                    onClick={
                      onRowClick
                        ? (event) => {
                            // Controls inside the row keep their own behaviour.
                            if (
                              (event.target as HTMLElement).closest(
                                "a,button,input,[role=checkbox],[role=menu]"
                              )
                            )
                              return;
                            onRowClick(row);
                          }
                        : undefined
                    }
                    className={cn(
                      "outline-none focus-visible:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
                      (href || onRowClick) && "cursor-pointer"
                    )}
                  >
                    {selectable && (
                      <TableCell className={cn("w-10 pr-0 pl-4", cellY)}>
                        <Checkbox
                          checked={selected}
                          onCheckedChange={(checked) =>
                            toggle([key], checked === true)
                          }
                          aria-label={l.selectRow}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, index) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          cellY,
                          index === 0 && !selectable && "pl-4",
                          index < pinned &&
                            !selectable &&
                            "sticky left-0 z-10 bg-card",
                          column.className
                        )}
                      >
                        {href && index === 0 ? (
                          <Link
                            href={href}
                            className="block font-medium hover:underline"
                          >
                            {column.cell(row)}
                          </Link>
                        ) : (
                          column.cell(row)
                        )}
                      </TableCell>
                    ))}
                    {rowActions && (
                      <TableCell className={cn("w-10 pr-4 text-right", cellY)}>
                        <RowMenu
                          actions={rowActions(row)}
                          label={l.actions}
                          Link={Link}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </table>
      </div>
      {footer}
    </div>
  );
}

function RowMenu({
  actions,
  label,
  Link,
}: {
  actions: DataTableRowAction[];
  label: string;
  Link: LinkComponent;
}) {
  if (actions.length === 0) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label={label} />}
      >
        <EllipsisIcon aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {actions.map((action) =>
          action.href ? (
            <DropdownMenuItem
              key={action.key}
              render={<Link href={action.href} />}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={action.key}
              variant={action.destructive ? "destructive" : "default"}
              onClick={action.onSelect}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface DataTableColumnHeaderProps {
  title: string;
  sortKey?: string;
  sort?: string | null;
  order?: DataTableOrder;
  onSort?: (sortKey: string, order: DataTableOrder) => void;
  onHide?: () => void;
  labels?: Partial<DataTableLabels>;
  className?: string;
}

/** A column's title, with a menu to sort by it or hide it when it can. */
function DataTableColumnHeader({
  title,
  sortKey,
  sort = null,
  order = "asc",
  onSort,
  onHide,
  labels,
  className,
}: DataTableColumnHeaderProps) {
  const l = labelsOf(labels);
  const sortable = sortKey !== undefined && onSort !== undefined;
  if (!sortable && !onHide) {
    return (
      <span className={cn("text-xs font-medium text-muted-foreground", className)}>
        {title}
      </span>
    );
  }
  const active = sortable && sort === sortKey;
  const Icon = active
    ? order === "asc"
      ? ArrowUpIcon
      : ArrowDownIcon
    : ChevronsUpDownIcon;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="xs"
            className={cn(
              "-ml-2.5 text-xs font-medium",
              active ? "text-foreground" : "text-muted-foreground",
              className
            )}
          />
        }
      >
        {title}
        {sortable && <Icon aria-hidden />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-36">
        {sortable && (
          <>
            <DropdownMenuItem onClick={() => onSort(sortKey, "asc")}>
              <ArrowUpIcon aria-hidden />
              {l.sortAscending}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort(sortKey, "desc")}>
              <ArrowDownIcon aria-hidden />
              {l.sortDescending}
            </DropdownMenuItem>
          </>
        )}
        {sortable && onHide && <DropdownMenuSeparator />}
        {onHide && (
          <DropdownMenuItem onClick={onHide}>
            <EyeOffIcon aria-hidden />
            {l.hideColumn}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface DataTableToolbarProps {
  search?: string;
  /** Called once typing pauses. Omit to show no search box. */
  onSearch?: (search: string) => void;
  facets?: DataTableFacet[];
  /** The chosen values of each facet, by facet key. */
  filters?: Record<string, string[]>;
  onFilter?: (key: string, values: string[]) => void;
  /** Every column, for the visibility menu; omit to show no menu. */
  columns?: { key: string; header: string }[];
  visible?: string[];
  onVisibleChange?: (keys: string[]) => void;
  /** A column that is never hidden, usually the first. */
  pinnedKey?: string;
  density?: DataTableDensity;
  onDensityChange?: (density: DataTableDensity) => void;
  /** Extra controls at the end of the row, such as the page's primary action. */
  children?: React.ReactNode;
  labels?: Partial<DataTableLabels>;
  className?: string;
}

/** Search, the facet filters, and the column and density menu. */
function DataTableToolbar({
  search = "",
  onSearch,
  facets = [],
  filters = {},
  onFilter,
  columns,
  visible,
  onVisibleChange,
  pinnedKey,
  density = "comfortable",
  onDensityChange,
  children,
  labels,
  className,
}: DataTableToolbarProps) {
  const l = labelsOf(labels);
  const [draft, setDraft] = React.useState(search);
  React.useEffect(() => setDraft(search), [search]);
  React.useEffect(() => {
    if (!onSearch || draft === search) return;
    const handle = setTimeout(() => onSearch(draft), 350);
    return () => clearTimeout(handle);
  }, [draft, search, onSearch]);

  const showColumns = columns && visible && onVisibleChange;

  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {onSearch && (
        <div className="relative">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={l.search}
            aria-label={l.search}
            className="h-7 w-56 pl-8"
          />
        </div>
      )}
      {onFilter &&
        facets.map((facet) => (
          <FacetFilter
            key={facet.key}
            facet={facet}
            selected={filters[facet.key] ?? []}
            onChange={(values) => onFilter(facet.key, values)}
            labels={l}
          />
        ))}
      <div className="ml-auto flex flex-wrap items-center gap-2">
        {showColumns && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" aria-label={l.columns} />
              }
            >
              <Columns3Icon aria-hidden />
              <span className="hidden sm:inline">{l.columns}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{l.columns}</DropdownMenuLabel>
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visible.includes(column.key)}
                    disabled={column.key === pinnedKey}
                    closeOnClick={false}
                    onCheckedChange={(checked) =>
                      onVisibleChange(
                        checked
                          ? [...visible, column.key]
                          : visible.filter((key) => key !== column.key)
                      )
                    }
                  >
                    {column.header}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
              {onDensityChange && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{l.density}</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={density}
                      onValueChange={(value) =>
                        onDensityChange(value as DataTableDensity)
                      }
                    >
                      <DropdownMenuRadioItem value="comfortable">
                        {l.comfortable}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="compact">
                        {l.compact}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {children}
      </div>
    </div>
  );
}

function FacetFilter({
  facet,
  selected,
  onChange,
  labels,
}: {
  facet: DataTableFacet;
  selected: string[];
  onChange: (values: string[]) => void;
  labels: DataTableLabels;
}) {
  // A long option list is searched, not stacked past the bottom of the screen.
  const [query, setQuery] = React.useState("");
  const searchable = facet.options.length > 8;
  const needle = query.trim().toLocaleLowerCase();
  const shown =
    searchable && needle
      ? facet.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(needle)
        )
      : facet.options;
  return (
    <Popover onOpenChange={(open) => !open && setQuery("")}>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <ListFilterIcon aria-hidden />
        {facet.label}
        {selected.length > 0 && (
          <Badge variant="secondary" className="ml-0.5 px-1 font-normal">
            {selected.length}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 gap-2 p-2">
        {searchable && (
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            aria-label={`${facet.label}: ${labels.search}`}
            className="h-7"
          />
        )}
        <ul
          role="group"
          aria-label={facet.label}
          className="flex max-h-64 flex-col gap-0.5 overflow-y-auto overscroll-contain"
        >
          {shown.length === 0 && (
            <li className="px-2 py-1.5 text-sm text-muted-foreground">
              {labels.noOptions}
            </li>
          )}
          {shown.map((option) => {
            const checked = selected.includes(option.value);
            return (
              <li key={option.value}>
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(next) =>
                      onChange(
                        next
                          ? [...selected, option.value]
                          : selected.filter((value) => value !== option.value)
                      )
                    }
                  />
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {checked && (
                    <CheckIcon
                      aria-hidden
                      className="size-3.5 text-muted-foreground"
                    />
                  )}
                </label>
              </li>
            );
          })}
        </ul>
        {selected.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => onChange([])}
          >
            {labels.clear}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}

export interface DataTableFilterChipsProps {
  search?: string;
  onSearch?: (search: string) => void;
  facets?: DataTableFacet[];
  filters?: Record<string, string[]>;
  onFilter?: (key: string, values: string[]) => void;
  onReset?: () => void;
  labels?: Partial<DataTableLabels>;
  className?: string;
}

/**
 * What narrows the list, as removable chips, so the reader always sees why
 * rows are missing. A filter no facet names still gets a chip: a list opened
 * from a link never filters behind the reader's back.
 */
function DataTableFilterChips({
  search = "",
  onSearch,
  facets = [],
  filters = {},
  onFilter,
  onReset,
  labels,
  className,
}: DataTableFilterChipsProps) {
  const l = labelsOf(labels);
  const chips: {
    key: string;
    label: string;
    value: string;
    onRemove?: () => void;
  }[] = [];
  if (search !== "") {
    chips.push({
      key: "search",
      label: l.search,
      value: `“${search}”`,
      onRemove: onSearch && (() => onSearch("")),
    });
  }
  const remove = (key: string, value: string) =>
    onFilter &&
    (() =>
      onFilter(
        key,
        (filters[key] ?? []).filter((v) => v !== value)
      ));
  for (const [key, values] of Object.entries(filters)) {
    const facet = facets.find((f) => f.key === key);
    for (const value of values) {
      chips.push({
        key: `${key}:${value}`,
        label: facet?.label ?? key,
        value: facet?.options.find((o) => o.value === value)?.label ?? value,
        onRemove: remove(key, value),
      });
    }
  }
  if (chips.length === 0) return null;
  return (
    <div
      data-slot="data-table-filter-chips"
      aria-label={l.filters}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex h-6 items-center gap-1 rounded-md border bg-muted/40 pl-2 text-xs"
        >
          <span className="text-muted-foreground">{chip.label}</span>
          <span className={cn("font-medium", !chip.onRemove && "pr-2")}>
            {chip.value}
          </span>
          {chip.onRemove && (
            <button
              type="button"
              onClick={chip.onRemove}
              aria-label={`${l.clear}: ${chip.label} ${chip.value}`}
              className="flex h-full items-center rounded-r-md px-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <XIcon aria-hidden className="size-3" />
            </button>
          )}
        </span>
      ))}
      {onReset && (
        <Button
          variant="ghost"
          size="xs"
          className="text-muted-foreground"
          onClick={onReset}
        >
          {l.reset}
        </Button>
      )}
    </div>
  );
}

export interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  pageSizes?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  labels?: Partial<DataTableLabels>;
  className?: string;
}

/** How many rows match, the page size, and the step between pages. */
function DataTablePagination({
  page,
  pageSize,
  total,
  pageSizes = [25, 50, 100],
  onPageChange,
  onPageSizeChange,
  labels,
  className,
}: DataTablePaginationProps) {
  const l = labelsOf(labels);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex items-center justify-between gap-4 border-t bg-muted/20 px-4 py-2",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <p className="text-xs text-muted-foreground tabular-nums">
          {l.results(total)}
        </p>
        {onPageSizeChange && (
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger
              size="sm"
              aria-label={l.rowsPerPage}
              className="w-20 text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label={l.previousPage}
        >
          <ChevronLeftIcon aria-hidden />
        </Button>
        <span className="px-1 text-xs text-muted-foreground tabular-nums">
          {l.pageOf(page, pages)}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          aria-label={l.nextPage}
        >
          <ChevronRightIcon aria-hidden />
        </Button>
      </div>
    </div>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableFilterChips,
  DataTablePagination,
  DataTableToolbar,
};
