import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpDatePickerComponent } from "./date-picker.component";

@Component({
  standalone: true,
  imports: [CpDatePickerComponent],
  template: `
    <cp-date-picker
      label="Data de início"
      [value]="value"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (valueChange)="value = $event"
    ></cp-date-picker>
  `,
})
class HostComponent {
  value: string | null = "2026-08-10";
  minDate = "";
  maxDate = "";
}

describe("CpDatePickerComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra a data selecionada formatada no campo", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    expect(input.value).toBe("10/08/2026");
  });

  it("abre o calendário ao clicar no campo", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it("seleciona uma data e emite o valor ISO", () => {
    fixture.componentInstance.value = "2026-08-01";
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.click();
    fixture.detectChanges();
    const day: HTMLButtonElement = fixture.nativeElement.querySelector('[data-date="2026-08-15"]');
    day.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe("2026-08-15");
  });

  it("fecha o calendário ao premir Escape", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.click();
    fixture.detectChanges();
    const day: HTMLButtonElement = fixture.nativeElement.querySelector('[data-date="2026-08-10"]');
    day.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it("desativa dias fora do intervalo minDate/maxDate", () => {
    fixture.componentInstance.minDate = "2026-08-05";
    fixture.componentInstance.maxDate = "2026-08-20";
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.click();
    fixture.detectChanges();
    const outOfRange: HTMLButtonElement = fixture.nativeElement.querySelector('[data-date="2026-08-01"]');
    expect(outOfRange.disabled).toBe(true);
  });
});
