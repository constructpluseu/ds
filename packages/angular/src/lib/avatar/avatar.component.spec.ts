import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpAvatarComponent } from "./avatar.component";

describe("CpAvatarComponent", () => {
  let fixture: ComponentFixture<CpAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CpAvatarComponent] }).compileComponents();
    fixture = TestBed.createComponent(CpAvatarComponent);
  });

  it("mostra as iniciais quando não há imagem", () => {
    fixture.componentInstance.name = "Guilherme Oliveira";
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe("GO");
  });

  it("renderiza a imagem quando src é fornecido", () => {
    fixture.componentInstance.name = "Guilherme Oliveira";
    fixture.componentInstance.src = "/avatar.jpg";
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector("img");
    expect(img.getAttribute("src")).toBe("/avatar.jpg");
  });

  it("mostra o indicador de estado quando definido", () => {
    fixture.componentInstance.name = "Guilherme Oliveira";
    fixture.componentInstance.status = "online";
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(".cp-avatar__status--online")).toBeTruthy();
  });
});
