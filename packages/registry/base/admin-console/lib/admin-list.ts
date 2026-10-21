/**
 * A console list's state, read back from the URL `DataList` writes: the
 * search, the page and its size, the sort, the facets' chosen values and
 * the row open in the panel. Pure, so a server page and a test read it
 * the same way; anything malformed falls back to the first page.
 */

export type ListSearchParams = Record<string, string | string[] | undefined>;

export interface ListQuery {
  q: string;
  /** 1-based. */
  page: number;
  size: number;
  /** Rows before this page: `(page - 1) * size`. */
  offset: number;
  sort: string | null;
  order: "asc" | "desc";
  /** Each facet's chosen values, by facet key. */
  filters: Record<string, string[]>;
  open: string | null;
}

/** The page sizes `DataTablePagination` offers. */
export const PAGE_SIZES = [25, 50, 100] as const;

const one = (value: string | string[] | undefined): string =>
  (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export function readListQuery(
  params: ListSearchParams,
  options: { facets?: readonly string[]; sorts?: readonly string[] } = {}
): ListQuery {
  const asked = Number(one(params.size));
  const size = (PAGE_SIZES as readonly number[]).includes(asked)
    ? asked
    : PAGE_SIZES[0];
  const page = Math.max(1, Math.floor(Number(one(params.page)) || 1));
  const sort = one(params.sort);
  const filters: Record<string, string[]> = {};
  for (const key of options.facets ?? []) {
    const values = one(params[key]).split(",").filter(Boolean);
    if (values.length > 0) filters[key] = values;
  }
  return {
    q: one(params.q),
    page,
    size,
    offset: (page - 1) * size,
    sort: sort && options.sorts?.includes(sort) ? sort : null,
    order: one(params.order) === "desc" ? "desc" : "asc",
    filters,
    open: one(params.open) || null,
  };
}
