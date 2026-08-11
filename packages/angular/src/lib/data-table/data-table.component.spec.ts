import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpDataTableComponent, DataTableColumn, DataTableRow, DataTableSortEvent } from "./data-table.component";

const columns: DataTableColumn[] = [
  { key: "nome", header: "Obra", sortable: true },
  { key: "orcamento", header: "Orçamento", sortable: true, align: "end" },
];

const rows: DataTableRow[] = [
  { id: "1", nome: "Reabilitação Rua Nova", orcamento: "120 000 €" },
  { id: "2", nome: "Moradia Cascais", orcamento: "340 000 €" },
];

@Component({
  standalone: true,
  imports: [CpDataTableComponent],
  template: `
    <cp-data-table
      [columns]="columns"
      [rows]="rows"
      [selectable]="selectable"
      [selectedKeys]="selectedKeys"
      [sortKey]="sortKey"
      [sortDirection]="sortDirection"
      (sortChange)="onSortChange($event)"
      (selectionChange)="selectedKeys = $event"
    ></cp-data-table>
  `,
})
class HostComponent {
  columns = columns;
  rows = rows;
  selectable = false;
  selectedKeys: string[] = [];
  sortKey: string | null = null;
  sortDirection: "asc" | "desc" | null = null;
  lastSortEvent: DataTableSortEvent | null = null;

  onSortChange(event: DataTableSortEvent): void {
    this.lastSortEvent = event;
  }
}

describe("CpDataTableComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra os cabeçalhos e as linhas de dados", () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Obra");
    expect(text).toContain("Reabilitação Rua Nova");
    expect(text).toContain("340 000 €");
  });

  it("mostra a mensagem vazia quando não há linhas", () => {
    fixture.componentInstance.rows = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Sem dados para mostrar.");
  });

  it("emite sortChange com a direção seguinte ao clicar num cabeçalho ordenável", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-data-table__sort-button");
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.lastSortEvent).toEqual({ key: "nome", direction: "asc" });
  });

  it("marca aria-sort na coluna atualmente ordenada", () => {
    fixture.componentInstance.sortKey = "nome";
    fixture.componentInstance.sortDirection = "asc";
    fixture.detectChanges();
    const th: HTMLTableCellElement = fixture.nativeElement.querySelector("th:nth-child(1)");
    expect(th.getAttribute("aria-sort")).toBe("ascending");
  });

  it("seleciona uma linha e emite selectionChange", () => {
    fixture.componentInstance.selectable = true;
    fixture.detectChanges();
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector(
      '[aria-label="Selecionar linha 1"]'
    );
    checkbox.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedKeys).toEqual(["1"]);
  });

  it("seleciona todas as linhas ao clicar no checkbox de cabeçalho", () => {
    fixture.componentInstance.selectable = true;
    fixture.detectChanges();
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector(
      '[aria-label="Selecionar todas as linhas"]'
    );
    checkbox.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedKeys).toEqual(["1", "2"]);
  });
});
