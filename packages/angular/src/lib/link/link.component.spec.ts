import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpLinkComponent } from "./link.component";

describe("CpLinkComponent", () => {
  let fixture: ComponentFixture<CpLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpLinkComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpLinkComponent);
  });

  it("renderiza um <a> com o href fornecido", () => {
    fixture.componentInstance.href = "/obras";
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector("a");
    expect(a.getAttribute("href")).toBe("/obras");
  });

  it("adiciona target=_blank e rel seguro quando external", () => {
    fixture.componentInstance.external = true;
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector("a");
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
