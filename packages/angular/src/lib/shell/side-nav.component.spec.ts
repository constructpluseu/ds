import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { axe } from "jest-axe";
import { CpSideNavComponent, SideNavItem } from "./side-nav.component";
import { COMPONENT_TEST_RULES } from "../../test-utils/a11y-rules";

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

  it("emite navigate com o item ao clicar num link de topo", () => {
    const sideNav = fixture.debugElement.children[0].componentInstance as CpSideNavComponent;
    const emitted: { item: SideNavItem; event: MouseEvent }[] = [];
    sideNav.navigate.subscribe((value) => emitted.push(value));

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href="/obras"]');
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(emitted).toHaveLength(1);
    expect(emitted[0].item.id).toBe("obras");
  });

  it("não tem violações de acessibilidade (axe-core)", async () => {
    fixture.componentInstance.expandedIds = ["financeiro"];
    fixture.detectChanges();
    const results = await axe(fixture.nativeElement, { rules: COMPONENT_TEST_RULES });
    expect(results).toHaveNoViolations();
  });
});
