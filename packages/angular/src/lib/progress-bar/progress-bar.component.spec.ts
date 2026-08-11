import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpProgressBarComponent } from "./progress-bar.component";

describe("CpProgressBarComponent", () => {
  let fixture: ComponentFixture<CpProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpProgressBarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpProgressBarComponent);
  });

  it("expõe role=progressbar com os valores corretos", () => {
    fixture.componentInstance.label = "Aprovisionamento";
    fixture.componentInstance.value = 40;
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('[role="progressbar"]');
    expect(bar.getAttribute("aria-valuenow")).toBe("40");
  });

  it("não expõe aria-valuenow quando indeterminate", () => {
    fixture.componentInstance.indeterminate = true;
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('[role="progressbar"]');
    expect(bar.getAttribute("aria-valuenow")).toBeNull();
  });
});
