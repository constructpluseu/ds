import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { axe } from "jest-axe";
import { CpHeaderComponent } from "./header.component";
import { COMPONENT_TEST_RULES } from "../../test-utils/a11y-rules";

@Component({
  standalone: true,
  imports: [CpHeaderComponent],
  template: `
    <cp-header brand="Construct+" [menuButton]="true" [navOpen]="navOpen" (menuToggle)="navOpen = !navOpen">
      <button>Perfil</button>
    </cp-header>
  `,
})
class HostComponent {
  navOpen = false;
}

describe("CpHeaderComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra a marca e as ações projetadas", () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Construct+");
    expect(text).toContain("Perfil");
  });

  it("mostra o botão de menu e alterna navOpen ao clicar", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[aria-label="Abrir menu de navegação"]'
    );
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.navOpen).toBe(true);
  });

  it("não tem violações de acessibilidade (axe-core)", async () => {
    const results = await axe(fixture.nativeElement, { rules: COMPONENT_TEST_RULES });
    expect(results).toHaveNoViolations();
  });
});
