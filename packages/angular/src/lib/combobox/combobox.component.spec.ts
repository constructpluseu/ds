import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpComboboxComponent, CpComboboxOption } from "./combobox.component";

const options: CpComboboxOption[] = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
];

@Component({
  standalone: true,
  imports: [CpComboboxComponent],
  template: `
    <cp-combobox
      label="Tipo de obra"
      [options]="options"
      [value]="value"
      [multiple]="multiple"
      (valueChange)="value = $event"
    ></cp-combobox>
  `,
})
class HostComponent {
  options = options;
  value: string[] = [];
  multiple = false;
}

describe("CpComboboxComponent (seleção única)", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra as opções ao focar", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.dispatchEvent(new Event("focus"));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="option"]').length).toBe(2);
  });

  it("seleciona uma opção ao clicar", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    input.dispatchEvent(new Event("focus"));
    fixture.detectChanges();
    const option: HTMLLIElement = fixture.nativeElement.querySelector('[role="option"]');
    option.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual(["residencial"]);
  });

  it("mostra o rótulo selecionado quando fechado", () => {
    fixture.componentInstance.value = ["comercial"];
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="combobox"]');
    expect(input.value).toBe("Comercial");
  });
});

describe("CpComboboxComponent (multiple)", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.multiple = true;
    fixture.componentInstance.value = ["residencial"];
    fixture.detectChanges();
  });

  it("mostra tags para cada seleção", () => {
    expect(fixture.nativeElement.textContent).toContain("Residencial");
  });

  it("remove a seleção ao clicar no × da tag", () => {
    const removeButton: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-tag__remove");
    removeButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual([]);
  });
});
