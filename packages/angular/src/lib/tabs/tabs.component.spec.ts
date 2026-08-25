import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { axe } from "jest-axe";
import { CpTabsComponent, CpTabItem } from "./tabs.component";
import { CpTabPanelComponent } from "./tab-panel.component";
import { COMPONENT_TEST_RULES } from "../../test-utils/a11y-rules";

@Component({
  standalone: true,
  imports: [CpTabsComponent, CpTabPanelComponent],
  template: `
    <cp-tabs [items]="items" [(activeId)]="activeId" ariaLabel="Detalhes da obra">
      <cp-tab-panel id="orcamento">Conteúdo do orçamento</cp-tab-panel>
      <cp-tab-panel id="materiais">Conteúdo dos materiais</cp-tab-panel>
    </cp-tabs>
  `,
})
class HostComponent {
  items: CpTabItem[] = [
    { id: "orcamento", label: "Orçamento" },
    { id: "materiais", label: "Materiais" },
  ];
  activeId = "";
}

describe("CpTabsComponent + CpTabPanelComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra o painel do primeiro separador por predefinição", () => {
    expect(fixture.nativeElement.textContent).toContain("Conteúdo do orçamento");
    expect(fixture.nativeElement.textContent).not.toContain("Conteúdo dos materiais");
  });

  it("troca de separador ao clicar", () => {
    const tabs: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('[role="tab"]');
    tabs[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Conteúdo dos materiais");
    expect(fixture.nativeElement.textContent).not.toContain("Conteúdo do orçamento");
  });

  it("navega com ArrowRight", () => {
    const tabs: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('[role="tab"]');
    tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    fixture.detectChanges();
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(fixture.nativeElement.textContent).toContain("Conteúdo dos materiais");
  });

  it("não tem violações de acessibilidade (axe-core)", async () => {
    const results = await axe(fixture.nativeElement, { rules: COMPONENT_TEST_RULES });
    expect(results).toHaveNoViolations();
  });
});
