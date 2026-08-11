import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTextareaComponent } from "./textarea.component";

describe("CpTextareaComponent", () => {
  let fixture: ComponentFixture<CpTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpTextareaComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpTextareaComponent);
  });

  it("emite valueChange com texto multilinha", () => {
    fixture.detectChanges();
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector("textarea");
    let emitted = "";
    fixture.componentInstance.valueChange.subscribe((v: string) => (emitted = v));
    textarea.value = "Linha 1\nLinha 2";
    textarea.dispatchEvent(new Event("input"));
    expect(emitted).toBe("Linha 1\nLinha 2");
  });
});
