import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpBreadcrumbComponent } from "./breadcrumb.component";

describe("CpBreadcrumbComponent", () => {
  let fixture: ComponentFixture<CpBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpBreadcrumbComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpBreadcrumbComponent);
    fixture.componentInstance.items = [{ label: "Obras", href: "/obras" }, { label: "Orçamento" }];
  });

  it("renderiza link para o primeiro item e span aria-current para o último", () => {
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector("a");
    expect(link.getAttribute("href")).toBe("/obras");
    const current: HTMLElement = fixture.nativeElement.querySelector(".cp-breadcrumb__current");
    expect(current.getAttribute("aria-current")).toBe("page");
  });
});
