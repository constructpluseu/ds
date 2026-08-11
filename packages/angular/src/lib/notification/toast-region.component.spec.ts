import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpToastRegionComponent } from "./toast-region.component";
import { CpToastService } from "./toast.service";

describe("CpToastRegionComponent + CpToastService", () => {
  let fixture: ComponentFixture<CpToastRegionComponent>;
  let service: CpToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpToastRegionComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpToastRegionComponent);
    service = TestBed.inject(CpToastService);
  });

  it("mostra um toast disparado via CpToastService.show", () => {
    fixture.detectChanges();
    service.show({ title: "Obra guardada com sucesso", status: "success", duration: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Obra guardada com sucesso");
  });

  it("remove o toast ao chamar dismiss", () => {
    fixture.detectChanges();
    const id = service.show({ title: "Temporário", duration: 0 });
    fixture.detectChanges();
    service.dismiss(id);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain("Temporário");
  });
});
