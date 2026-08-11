import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpStructuredListComponent } from "./structured-list.component";

describe("CpStructuredListComponent", () => {
  let fixture: ComponentFixture<CpStructuredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpStructuredListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpStructuredListComponent);
    fixture.componentInstance.headers = ["Material", "Quantidade"];
    fixture.componentInstance.rows = [
      ["Cimento", "50 sacos"],
      ["Areia", "3 m³"],
    ];
  });

  it("renderiza cabeçalhos e linhas", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll("th").length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll("tr").length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain("50 sacos");
  });
});
