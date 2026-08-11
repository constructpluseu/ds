import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpPopoverComponent } from "./popover.component";

@Component({
  standalone: true,
  imports: [CpPopoverComponent],
  template: `
    <cp-popover #pop>
      <button cpPopoverTrigger (click)="pop.toggle()">Abrir</button>
      Conteúdo do popover
    </cp-popover>
  `,
})
class HostComponent {}

describe("CpPopoverComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("não mostra o painel por predefinição", () => {
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it("abre ao clicar no gatilho", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]').textContent).toContain(
      "Conteúdo do popover"
    );
  });

  it("fecha ao premir Escape", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
});
