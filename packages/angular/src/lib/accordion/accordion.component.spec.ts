import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpAccordionComponent, CpAccordionItem } from "./accordion.component";
import { CpAccordionPanelComponent } from "./accordion-panel.component";

@Component({
  standalone: true,
  imports: [CpAccordionComponent, CpAccordionPanelComponent],
  template: `
    <cp-accordion [items]="items">
      <cp-accordion-panel id="a">Conteúdo de garantias</cp-accordion-panel>
      <cp-accordion-panel id="b">Conteúdo de faturação</cp-accordion-panel>
    </cp-accordion>
  `,
})
class HostComponent {
  items: CpAccordionItem[] = [
    { id: "a", title: "Garantias" },
    { id: "b", title: "Faturação" },
  ];
}

describe("CpAccordionComponent + CpAccordionPanelComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("começa fechado e expande ao clicar", () => {
    expect(fixture.nativeElement.textContent).not.toContain("Conteúdo de garantias");
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Conteúdo de garantias");
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });

  it("fecha o painel anterior quando allowMultiple=false", () => {
    const buttons: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll("button");
    buttons[0].click();
    fixture.detectChanges();
    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain("Conteúdo de garantias");
    expect(fixture.nativeElement.textContent).toContain("Conteúdo de faturação");
  });
});
