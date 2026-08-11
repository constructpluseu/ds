import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "start" | "end";
}

export type SortDirection = "asc" | "desc" | null;

export interface DataTableSortEvent {
  key: string;
  direction: SortDirection;
}

const defaultRowKey = (row: DataTableRow) => String(row["id"] ?? "");

@Component({
  selector: "cp-data-table",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-data-table">
      <table class="cp-data-table__table">
        <caption *ngIf="caption" class="cp-visually-hidden">{{ caption }}</caption>
        <thead>
          <tr>
            <th *ngIf="selectable" scope="col" class="cp-data-table__checkbox-cell">
              <label class="cp-checkbox">
                <input
                  type="checkbox"
                  class="cp-checkbox__input"
                  [checked]="allSelected"
                  [indeterminate]="someSelected"
                  aria-label="Selecionar todas as linhas"
                  (change)="toggleAll()"
                />
                <span class="cp-checkbox__box" aria-hidden="true"></span>
              </label>
            </th>
            <th
              *ngFor="let column of columns"
              scope="col"
              [attr.aria-sort]="ariaSort(column)"
              [class]="headerClasses(column)"
            >
              <button
                *ngIf="column.sortable"
                type="button"
                class="cp-data-table__sort-button"
                (click)="onHeaderClick(column)"
              >
                {{ column.header }}
                <span [class]="sortIconClasses(column)" aria-hidden="true">{{ sortIcon(column) }}</span>
              </button>
              <ng-container *ngIf="!column.sortable">{{ column.header }}</ng-container>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="rows.length === 0">
            <td class="cp-data-table__empty" [attr.colspan]="columns.length + (selectable ? 1 : 0)">
              {{ emptyMessage }}
            </td>
          </tr>
          <tr *ngFor="let row of rows" [class]="rowClasses(row)">
            <td *ngIf="selectable" class="cp-data-table__checkbox-cell">
              <label class="cp-checkbox">
                <input
                  type="checkbox"
                  class="cp-checkbox__input"
                  [checked]="isSelected(row)"
                  [attr.aria-label]="'Selecionar linha ' + rowKey(row)"
                  (change)="toggleRow(row)"
                />
                <span class="cp-checkbox__box" aria-hidden="true"></span>
              </label>
            </td>
            <td *ngFor="let column of columns" [class]="cellClasses(column)">{{ row[column.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CpDataTableComponent {
  @Input() columns: DataTableColumn[] = [];
  @Input() rows: DataTableRow[] = [];
  @Input() rowKeyFn: (row: DataTableRow) => string = defaultRowKey;
  @Input() caption = "";
  @Input() sortKey: string | null = null;
  @Input() sortDirection: SortDirection = null;
  @Input() selectable = false;
  @Input() selectedKeys: string[] = [];
  @Input() emptyMessage = "Sem dados para mostrar.";
  @Output() sortChange = new EventEmitter<DataTableSortEvent>();
  @Output() selectionChange = new EventEmitter<string[]>();

  rowKey(row: DataTableRow): string {
    return this.rowKeyFn(row);
  }

  get allKeys(): string[] {
    return this.rows.map((row) => this.rowKey(row));
  }

  get allSelected(): boolean {
    return this.allKeys.length > 0 && this.allKeys.every((key) => this.selectedKeys.includes(key));
  }

  get someSelected(): boolean {
    return !this.allSelected && this.allKeys.some((key) => this.selectedKeys.includes(key));
  }

  isSelected(row: DataTableRow): boolean {
    return this.selectedKeys.includes(this.rowKey(row));
  }

  headerClasses(column: DataTableColumn): string {
    return ["cp-data-table__header-cell", column.align === "end" ? "cp-data-table__header-cell--end" : ""]
      .filter(Boolean)
      .join(" ");
  }

  cellClasses(column: DataTableColumn): string {
    return ["cp-data-table__cell", column.align === "end" ? "cp-data-table__cell--end" : ""]
      .filter(Boolean)
      .join(" ");
  }

  rowClasses(row: DataTableRow): string {
    return ["cp-data-table__row", this.isSelected(row) ? "cp-data-table__row--selected" : ""]
      .filter(Boolean)
      .join(" ");
  }

  isSorted(column: DataTableColumn): boolean {
    return this.sortKey === column.key && this.sortDirection !== null;
  }

  sortIconClasses(column: DataTableColumn): string {
    return ["cp-data-table__sort-icon", this.isSorted(column) ? "cp-data-table__sort-icon--active" : ""]
      .filter(Boolean)
      .join(" ");
  }

  sortIcon(column: DataTableColumn): string {
    return this.sortKey === column.key && this.sortDirection === "desc" ? "▼" : "▲";
  }

  ariaSort(column: DataTableColumn): "ascending" | "descending" | null {
    if (this.sortKey !== column.key || this.sortDirection === null) return null;
    return this.sortDirection === "asc" ? "ascending" : "descending";
  }

  private nextDirection(column: DataTableColumn): SortDirection {
    if (this.sortKey !== column.key) return "asc";
    if (this.sortDirection === "asc") return "desc";
    if (this.sortDirection === "desc") return null;
    return "asc";
  }

  onHeaderClick(column: DataTableColumn): void {
    if (!column.sortable) return;
    this.sortChange.emit({ key: column.key, direction: this.nextDirection(column) });
  }

  toggleAll(): void {
    this.selectionChange.emit(this.allSelected ? [] : this.allKeys);
  }

  toggleRow(row: DataTableRow): void {
    const key = this.rowKey(row);
    this.selectionChange.emit(
      this.selectedKeys.includes(key) ? this.selectedKeys.filter((k) => k !== key) : [...this.selectedKeys, key]
    );
  }
}
