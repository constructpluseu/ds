import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpRadioButtonComponent } from "./radio-button.component";

describe("CpRadioButtonComponent", () => {
  let fixture: ComponentFixture<CpRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpRadioButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpRadioButtonComponent);
  });

  it("emite valueChange com o próprio value ao selecionar", () => {
    fixture.componentInstance.value = "comercial";
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    let emitted = "";
    fixture.componentInstance.valueChange.subscribe((v: string) => (emitted = v));
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    expect(emitted).toBe("comercial");
  });
});
