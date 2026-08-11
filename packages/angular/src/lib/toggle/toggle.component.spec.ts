import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpToggleComponent } from "./toggle.component";

describe("CpToggleComponent", () => {
  let fixture: ComponentFixture<CpToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpToggleComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpToggleComponent);
  });

  it("usa role=switch e emite checkedChange ao alternar", () => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("input[role=switch]");
    let emitted: boolean | undefined;
    fixture.componentInstance.checkedChange.subscribe((v: boolean) => (emitted = v));
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    expect(emitted).toBe(true);
  });
});
