import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTileComponent } from "./tile.component";

describe("CpTileComponent", () => {
  let fixture: ComponentFixture<CpTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpTileComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpTileComponent);
    fixture.componentInstance.title = "Aprovisionamento";
  });

  it("renderiza como <a> quando href é fornecido", () => {
    fixture.componentInstance.href = "/modulos/aprovisionamento";
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector("a.cp-tile");
    expect(link.getAttribute("href")).toBe("/modulos/aprovisionamento");
  });

  it("renderiza como <button> quando não há href", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("button.cp-tile")).toBeTruthy();
  });
});
