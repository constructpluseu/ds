import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpHeaderComponent } from "./header.component";

@Component({
  standalone: true,
  imports: [CpHeaderComponent],
  template: `
    <cp-header brand="Construct+" [menuButton]="true" [navOpen]="navOpen" (menuToggle)="navOpen = !navOpen">
      <button>Perfil</button>
    </cp-header>
  `,
})
class HostComponent {
  navOpen = false;
}

describe("CpHeaderComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra a marca e as ações projetadas", () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Construct+");
    expect(text).toContain("Perfil");
  });

  it("mostra o botão de menu e alterna navOpen ao clicar", () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[aria-label="Abrir menu de navegação"]'
    );
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.navOpen).toBe(true);
  });
});
