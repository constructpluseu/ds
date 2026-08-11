import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpCheckboxComponent } from "./checkbox.component";

describe("CpCheckboxComponent", () => {
  let fixture: ComponentFixture<CpCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpCheckboxComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpCheckboxComponent);
  });

  it("emite checkedChange ao clicar", () => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    let emitted: boolean | undefined;
    fixture.componentInstance.checkedChange.subscribe((v: boolean) => (emitted = v));
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    expect(emitted).toBe(true);
  });

  it("aplica indeterminate no elemento nativo", () => {
    fixture.componentInstance.indeterminate = true;
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input");
    expect(input.indeterminate).toBe(true);
  });
});
