import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpSliderComponent } from "./slider.component";

describe("CpSliderComponent", () => {
  let fixture: ComponentFixture<CpSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpSliderComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpSliderComponent);
    fixture.componentInstance.label = "Progresso";
    fixture.componentInstance.value = 40;
  });

  it("mostra o label e o valor", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Progresso");
    expect(fixture.nativeElement.textContent).toContain("40");
  });

  it("emite valueChange ao alterar o valor", () => {
    fixture.detectChanges();
    let emitted = 0;
    fixture.componentInstance.valueChange.subscribe((v: number) => (emitted = v));
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="range"]');
    input.value = "60";
    input.dispatchEvent(new Event("input"));
    expect(emitted).toBe(60);
  });
});
