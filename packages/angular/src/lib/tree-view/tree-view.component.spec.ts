import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTreeViewComponent, TreeNode } from "./tree-view.component";

const nodes: TreeNode[] = [
  {
    id: "obras",
    label: "Obras",
    children: [
      {
        id: "residencial",
        label: "Residencial",
        children: [{ id: "moradia-cascais", label: "Moradia Cascais" }],
      },
      { id: "comercial", label: "Comercial" },
    ],
  },
  { id: "arquivo", label: "Arquivo", disabled: true },
];

@Component({
  standalone: true,
  imports: [CpTreeViewComponent],
  template: `
    <cp-tree-view
      label="Categorias"
      [nodes]="nodes"
      [expandedIds]="expandedIds"
      [selectedId]="selectedId"
      (expandedChange)="expandedIds = $event"
      (select)="selectedId = $event"
    ></cp-tree-view>
  `,
})
class HostComponent {
  nodes = nodes;
  expandedIds: string[] = [];
  selectedId: string | null = null;
}

describe("CpTreeViewComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra apenas os nós de topo quando nada está expandido", () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Obras");
    expect(text).toContain("Arquivo");
    expect(text).not.toContain("Residencial");
  });

  it("expande um nó ao clicar no botão de expandir", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Expandir"]');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expandedIds).toEqual(["obras"]);
  });

  it("seleciona um nó ao clicar", () => {
    const item: HTMLLIElement = fixture.nativeElement.querySelector('[role="treeitem"]');
    item.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedId).toBe("obras");
  });

  it("não seleciona nós desativados", () => {
    const items: NodeListOf<HTMLLIElement> = fixture.nativeElement.querySelectorAll('[role="treeitem"]');
    items[items.length - 1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedId).toBeNull();
  });

  it("expande com a seta direita quando o nó está fechado", () => {
    const item: HTMLLIElement = fixture.nativeElement.querySelector('[role="treeitem"]');
    item.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    fixture.detectChanges();
    expect(fixture.componentInstance.expandedIds).toEqual(["obras"]);
  });

  it("colapsa com a seta esquerda quando o nó está aberto", () => {
    fixture.componentInstance.expandedIds = ["obras"];
    fixture.detectChanges();
    const item: HTMLLIElement = fixture.nativeElement.querySelector('[role="treeitem"]');
    item.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    fixture.detectChanges();
    expect(fixture.componentInstance.expandedIds).toEqual([]);
  });

  it("move o foco para o próximo nó visível com a seta para baixo", () => {
    fixture.componentInstance.expandedIds = ["obras"];
    fixture.detectChanges();
    const obrasItem: HTMLLIElement = fixture.nativeElement.querySelector('[data-node-id="obras"]');
    obrasItem.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    fixture.detectChanges();
    const residencialItem: HTMLLIElement = fixture.nativeElement.querySelector('[data-node-id="residencial"]');
    expect(document.activeElement).toBe(residencialItem);
  });
});
