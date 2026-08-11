export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "start" | "end";
}

export type SortDirection = "asc" | "desc" | null;
