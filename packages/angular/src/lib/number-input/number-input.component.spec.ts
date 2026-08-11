import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpNumberInputComponent } from "./number-input.component";

describe("CpNumberInputComponent", () => {
  let fixture: ComponentFixture<CpNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpNumberInputComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpNumberInputComponent);
    fixture.componentInstance.value = 5;
  });

  it("emite valueChange incrementado ao clicar em Aumentar", () => {
    fixture.detectChanges();
    let emitted = 0;
    fixture.componentInstance.valueChange.subscribe((v: number) => (emitted = v));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Aumentar"]');
    button.click();
    expect(emitted).toBe(6);
  });

  it("desativa 'Diminuir' no limite mínimo", () => {
    fixture.componentInstance.value = 0;
    fixture.componentInstance.min = 0;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Diminuir"]');
    expect(button.disabled).toBe(true);
  });
});
