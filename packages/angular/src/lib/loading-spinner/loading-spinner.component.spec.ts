import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpLoadingSpinnerComponent } from "./loading-spinner.component";

describe("CpLoadingSpinnerComponent", () => {
  let fixture: ComponentFixture<CpLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpLoadingSpinnerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpLoadingSpinnerComponent);
  });

  it("expõe role=status com o label predefinido", () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector("span");
    expect(el.getAttribute("role")).toBe("status");
    expect(el.getAttribute("aria-label")).toBe("A carregar…");
  });

  it("aplica a classe de tamanho", () => {
    fixture.componentInstance.size = "lg";
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector("span");
    expect(el.className).toContain("cp-spinner--lg");
  });
});
