import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTextInputComponent } from "./text-input.component";

describe("CpTextInputComponent", () => {
  let fixture: ComponentFixture<CpTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpTextInputComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpTextInputComponent);
  });

  it("associa o label ao campo via for/id", () => {
    fixture.componentInstance.label = "Nome da obra";
    fixture.detectChanges();
    const label: HTMLLabelElement = fixture.nativeElement.querySelector("label");
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    expect(label.getAttribute("for")).toBe(input.id);
  });

  it("marca aria-invalid quando há errorText", () => {
    fixture.componentInstance.errorText = "Email inválido";
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("emite valueChange ao digitar", () => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    let emitted = "";
    fixture.componentInstance.valueChange.subscribe((v: string) => (emitted = v));
    input.value = "Obra Central";
    input.dispatchEvent(new Event("input"));
    expect(emitted).toBe("Obra Central");
  });
});
