import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpCardComponent } from "./card.component";

describe("CpCardComponent", () => {
  let fixture: ComponentFixture<CpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpCardComponent);
  });

  it("renderiza título e subtítulo", () => {
    fixture.componentInstance.title = "Obra Central";
    fixture.componentInstance.subtitle = "Residencial";
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Obra Central");
    expect(fixture.nativeElement.textContent).toContain("Residencial");
  });

  it("aplica a classe interactive quando interactive=true", () => {
    fixture.componentInstance.interactive = true;
    fixture.detectChanges();
    const wrapper: HTMLElement = fixture.nativeElement.querySelector(".cp-card");
    expect(wrapper.className).toContain("cp-card--interactive");
  });
});
