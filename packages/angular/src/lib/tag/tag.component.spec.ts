import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpTagComponent } from "./tag.component";

describe("CpTagComponent", () => {
  let fixture: ComponentFixture<CpTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpTagComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpTagComponent);
  });

  it("aplica a classe da variante de estado", () => {
    fixture.componentInstance.status = "success";
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector(".cp-tag");
    expect(span.className).toContain("cp-tag--success");
  });

  it("emite remove ao clicar no botão de remover", () => {
    fixture.componentInstance.removable = true;
    fixture.detectChanges();
    let removed = false;
    fixture.componentInstance.remove.subscribe(() => (removed = true));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-tag__remove");
    button.click();
    expect(removed).toBe(true);
  });
});
