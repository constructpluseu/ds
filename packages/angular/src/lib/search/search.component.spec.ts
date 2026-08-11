import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpSearchComponent } from "./search.component";

describe("CpSearchComponent", () => {
  let fixture: ComponentFixture<CpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpSearchComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpSearchComponent);
  });

  it("usa role=searchbox e o label como placeholder", () => {
    fixture.componentInstance.label = "Procurar obras";
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[role="searchbox"]');
    expect(input.placeholder).toBe("Procurar obras");
  });

  it("emite clear ao clicar no botão de limpar", () => {
    fixture.componentInstance.value = "obra";
    fixture.componentInstance.clearable = true;
    fixture.detectChanges();
    let cleared = false;
    fixture.componentInstance.clear.subscribe(() => (cleared = true));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Limpar pesquisa"]');
    button.click();
    expect(cleared).toBe(true);
  });
});
