import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "start" | "end";
}

export type SortDirection = "asc" | "desc" | null;

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowKey?: (row: DataTableRow) => string;
  caption?: string;
  sortKey?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  emptyMessage?: string;
  renderCell?: (row: DataTableRow, column: DataTableColumn) => ReactNode;
}

const defaultRowKey = (row: DataTableRow) => String(row.id ?? "");

export function DataTable({
  columns,
  rows,
  rowKey = defaultRowKey,
  caption,
  sortKey = null,
  sortDirection = null,
  onSortChange,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  emptyMessage = "Sem dados para mostrar.",
  renderCell,
}: DataTableProps) {
  const selectedSet = new Set(selectedKeys);
  const allKeys = rows.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedSet.has(key));
  const someSelected = !allSelected && allKeys.some((key) => selectedSet.has(key));
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  function nextDirection(column: DataTableColumn): SortDirection {
    if (sortKey !== column.key) return "asc";
    if (sortDirection === "asc") return "desc";
    if (sortDirection === "desc") return null;
    return "asc";
  }

  function onHeaderClick(column: DataTableColumn) {
    if (!column.sortable || !onSortChange) return;
    onSortChange(column.key, nextDirection(column));
  }

  function toggleAll() {
    onSelectionChange?.(allSelected ? [] : allKeys);
  }

  function toggleRow(key: string) {
    if (!onSelectionChange) return;
    onSelectionChange(selectedSet.has(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key]);
  }

  return (
    <div className="cp-data-table">
      <table className="cp-data-table__table">
        {caption && <caption className="cp-visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {selectable && (
              <th className="cp-data-table__checkbox-cell" scope="col">
                <label className="cp-checkbox">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="cp-checkbox__input"
                    checked={allSelected}
                    aria-label="Selecionar todas as linhas"
                    onChange={toggleAll}
                  />
                  <span className="cp-checkbox__box" aria-hidden="true" />
                </label>
              </th>
            )}
            {columns.map((column) => {
              const isSorted = sortKey === column.key && sortDirection !== null;
              const ariaSort = isSorted ? (sortDirection === "asc" ? "ascending" : "descending") : undefined;
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={`cp-data-table__header-cell${column.align === "end" ? " cp-data-table__header-cell--end" : ""}`}
                >
                  {column.sortable ? (
                    <button type="button" className="cp-data-table__sort-button" onClick={() => onHeaderClick(column)}>
                      {column.header}
                      <span
                        className={`cp-data-table__sort-icon${isSorted ? " cp-data-table__sort-icon--active" : ""}`}
                        aria-hidden="true"
                      >
                        {sortKey === column.key && sortDirection === "desc" ? "▼" : "▲"}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="cp-data-table__empty" colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const key = rowKey(row);
              const selected = selectedSet.has(key);
              return (
                <tr key={key} className={`cp-data-table__row${selected ? " cp-data-table__row--selected" : ""}`}>
                  {selectable && (
                    <td className="cp-data-table__checkbox-cell">
                      <label className="cp-checkbox">
                        <input
                          type="checkbox"
                          className="cp-checkbox__input"
                          checked={selected}
                          aria-label={`Selecionar linha ${key}`}
                          onChange={() => toggleRow(key)}
                        />
                        <span className="cp-checkbox__box" aria-hidden="true" />
                      </label>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`cp-data-table__cell${column.align === "end" ? " cp-data-table__cell--end" : ""}`}
                    >
                      {renderCell ? renderCell(row, column) : (row[column.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
