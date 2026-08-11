import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpSideNavComponent, SideNavItem } from "./side-nav.component";

const items: SideNavItem[] = [
  { id: "obras", label: "Obras", href: "/obras" },
  {
    id: "financeiro",
    label: "Financeiro",
    href: "/financeiro",
    children: [
      { id: "orcamentos", label: "Orçamentos", href: "/financeiro/orcamentos" },
      { id: "faturas", label: "Faturas", href: "/financeiro/faturas" },
    ],
  },
];

@Component({
  standalone: true,
  imports: [CpSideNavComponent],
  template: `
    <cp-side-nav
      [items]="items"
      [activeId]="activeId"
      [expandedIds]="expandedIds"
      (expandedChange)="expandedIds = $event"
    ></cp-side-nav>
  `,
})
class HostComponent {
  items = items;
  activeId: string | null = "obras";
  expandedIds: string[] = [];
}

describe("CpSideNavComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra os itens de topo e marca o item ativo", () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href="/obras"]');
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("não mostra sub-itens quando o grupo está fechado", () => {
    expect(fixture.nativeElement.textContent).not.toContain("Orçamentos");
  });

  it("emite expandedChange ao clicar num grupo", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-side-nav__toggle");
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expandedIds).toEqual(["financeiro"]);
  });

  it("mostra os sub-itens quando o grupo está expandido", () => {
    fixture.componentInstance.expandedIds = ["financeiro"];
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Orçamentos");
    expect(text).toContain("Faturas");
  });
});
