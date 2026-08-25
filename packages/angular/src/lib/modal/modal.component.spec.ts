import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { axe } from "jest-axe";
import { CpModalComponent } from "./modal.component";
import { COMPONENT_TEST_RULES } from "../../test-utils/a11y-rules";

@Component({
  standalone: true,
  imports: [CpModalComponent],
  template: `
    <cp-modal [open]="open" title="Eliminar contrato" (close)="onClose()">
      <button>Confirmar</button>
    </cp-modal>
  `,
})
class HostComponent {
  open = true;
  closed = false;
  onClose(): void {
    this.closed = true;
  }
}

describe("CpModalComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
  });

  it("não renderiza nada quando open=false", () => {
    fixture.componentInstance.open = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it("expõe role=dialog, aria-modal e associa o título", () => {
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    const titleId = dialog.getAttribute("aria-labelledby");
    expect(fixture.nativeElement.querySelector(`#${titleId}`).textContent.trim()).toBe(
      "Eliminar contrato"
    );
  });

  it("emite close ao clicar no botão de fechar", () => {
    fixture.detectChanges();
    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-modal__close");
    closeButton.click();
    expect(fixture.componentInstance.closed).toBe(true);
  });

  it("emite close ao premir Escape", () => {
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(fixture.componentInstance.closed).toBe(true);
  });

  it("não tem violações de acessibilidade (axe-core)", async () => {
    fixture.detectChanges();
    const results = await axe(fixture.nativeElement, { rules: COMPONENT_TEST_RULES });
    expect(results).toHaveNoViolations();
  });
});
