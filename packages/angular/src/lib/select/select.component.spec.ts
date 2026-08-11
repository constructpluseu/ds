import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpSelectComponent } from "./select.component";

describe("CpSelectComponent", () => {
  let fixture: ComponentFixture<CpSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpSelectComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpSelectComponent);
    fixture.componentInstance.options = [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
    ];
  });

  it("lista as opções fornecidas", () => {
    fixture.detectChanges();
    const opts = fixture.nativeElement.querySelectorAll("option");
    expect(opts.length).toBe(2);
  });

  it("emite valueChange ao escolher uma opção", () => {
    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.nativeElement.querySelector("select");
    let emitted = "";
    fixture.componentInstance.valueChange.subscribe((v: string) => (emitted = v));
    select.value = "comercial";
    select.dispatchEvent(new Event("change"));
    expect(emitted).toBe("comercial");
  });
});
