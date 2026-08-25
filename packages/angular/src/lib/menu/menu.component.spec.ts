import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { axe } from "jest-axe";
import { CpMenuComponent, CpMenuItem } from "./menu.component";
import { COMPONENT_TEST_RULES } from "../../test-utils/a11y-rules";

@Component({
  standalone: true,
  imports: [CpMenuComponent],
  template: `
    <cp-menu #menu [items]="items">
      <button cpMenuTrigger (click)="menu.toggle()">Ações</button>
    </cp-menu>
  `,
})
class HostComponent {
  editou = false;
  items: CpMenuItem[] = [
    { id: "editar", label: "Editar", onSelect: () => (this.editou = true) },
    { id: "eliminar", label: "Eliminar", onSelect: () => {}, danger: true },
  ];
}

describe("CpMenuComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("abre ao clicar no gatilho e mostra os itens", () => {
    fixture.nativeElement.querySelector("button").click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="menuitem"]').length).toBe(2);
  });

  it("chama onSelect e fecha ao clicar num item", () => {
    fixture.nativeElement.querySelector("button").click();
    fixture.detectChanges();
    const menuItem: HTMLButtonElement = fixture.nativeElement.querySelector('[role="menuitem"]');
    menuItem.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.editou).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeNull();
  });

  it("não tem violações de acessibilidade (axe-core) com o painel aberto", async () => {
    fixture.nativeElement.querySelector("button").click();
    fixture.detectChanges();
    const results = await axe(fixture.nativeElement, { rules: COMPONENT_TEST_RULES });
    expect(results).toHaveNoViolations();
  });
});
