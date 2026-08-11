import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpPaginationComponent } from "./pagination.component";

describe("CpPaginationComponent", () => {
  let fixture: ComponentFixture<CpPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpPaginationComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpPaginationComponent);
    fixture.componentInstance.page = 2;
    fixture.componentInstance.totalPages = 5;
  });

  it("desativa 'Página anterior' na primeira página", () => {
    fixture.componentInstance.page = 1;
    fixture.detectChanges();
    const prev: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Página anterior"]');
    expect(prev.disabled).toBe(true);
  });

  it("emite pageChange com a página correta", () => {
    fixture.detectChanges();
    let emitted = 0;
    fixture.componentInstance.pageChange.subscribe((p: number) => (emitted = p));
    const next: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Página seguinte"]');
    next.click();
    expect(emitted).toBe(3);
  });
});
