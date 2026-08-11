import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpButtonComponent } from "./button.component";

describe("CpButtonComponent", () => {
  let fixture: ComponentFixture<CpButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpButtonComponent);
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector("button");
  }

  it("usa type=button por padrão", () => {
    fixture.detectChanges();
    expect(getButton().type).toBe("button");
  });

  it("aplica as classes de variante e tamanho", () => {
    fixture.componentInstance.variant = "accent";
    fixture.componentInstance.size = "lg";
    fixture.detectChanges();
    expect(getButton().className).toContain("cp-button--accent");
    expect(getButton().className).toContain("cp-button--lg");
  });

  it("fica desativado quando disabled", () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(getButton().disabled).toBe(true);
  });

  it("fica desativado e com aria-busy quando loading", () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    expect(getButton().disabled).toBe(true);
    expect(getButton().getAttribute("aria-busy")).toBe("true");
    expect(fixture.nativeElement.querySelector(".cp-button__spinner")).toBeTruthy();
  });
});
