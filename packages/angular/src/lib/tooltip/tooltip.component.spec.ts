import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTooltipComponent } from "./tooltip.component";

@Component({
  standalone: true,
  imports: [CpTooltipComponent],
  template: `<cp-tooltip content="Guarda as alterações"><button>Guardar</button></cp-tooltip>`,
})
class HostComponent {}

describe("CpTooltipComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("associa o tooltip ao gatilho via aria-describedby", () => {
    const button: HTMLElement = fixture.nativeElement.querySelector("button");
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(button.getAttribute("aria-describedby")).toBe(tooltip.id);
  });

  it("fica visível no mouseenter do wrapper", () => {
    const wrapper: HTMLElement = fixture.nativeElement.querySelector(".cp-tooltip-wrapper");
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip.className).not.toContain("cp-tooltip--visible");
    wrapper.dispatchEvent(new Event("mouseenter"));
    fixture.detectChanges();
    expect(tooltip.className).toContain("cp-tooltip--visible");
  });
});
