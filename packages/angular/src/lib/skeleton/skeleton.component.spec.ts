import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpSkeletonComponent } from "./skeleton.component";

describe("CpSkeletonComponent", () => {
  let fixture: ComponentFixture<CpSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpSkeletonComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpSkeletonComponent);
  });

  it("é oculto de leitores de ecrã (aria-hidden)", () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector("span");
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("aplica a classe da variante", () => {
    fixture.componentInstance.variant = "circle";
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector("span");
    expect(el.className).toContain("cp-skeleton--circle");
  });
});
