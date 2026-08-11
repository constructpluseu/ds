import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpListComponent } from "./list.component";

describe("CpListComponent", () => {
  let fixture: ComponentFixture<CpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpListComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpListComponent);
    fixture.componentInstance.items = ["Materiais", "Equipa"];
  });

  it("renderiza um <ul> por predefinição com os itens", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("ul")).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll("li").length).toBe(2);
  });

  it("renderiza um <ol> quando ordered=true", () => {
    fixture.componentInstance.ordered = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("ol")).toBeTruthy();
  });
});
