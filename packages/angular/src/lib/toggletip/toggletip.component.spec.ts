import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpToggletipComponent } from "./toggletip.component";

describe("CpToggletipComponent", () => {
  let fixture: ComponentFixture<CpToggletipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpToggletipComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpToggletipComponent);
  });

  it("não mostra o conteúdo por predefinição", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });

  it("mostra o conteúdo ao clicar no gatilho", () => {
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });
});
