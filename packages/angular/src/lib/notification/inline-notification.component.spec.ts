import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpInlineNotificationComponent } from "./inline-notification.component";

describe("CpInlineNotificationComponent", () => {
  let fixture: ComponentFixture<CpInlineNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpInlineNotificationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CpInlineNotificationComponent);
  });

  it("usa role=alert para status danger", () => {
    fixture.componentInstance.status = "danger";
    fixture.componentInstance.title = "Falha ao guardar";
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
  });

  it("emite close ao clicar em fechar", () => {
    fixture.componentInstance.title = "Guardado";
    fixture.componentInstance.dismissible = true;
    fixture.detectChanges();
    let closed = false;
    fixture.componentInstance.close.subscribe(() => (closed = true));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(".cp-notification__close");
    button.click();
    expect(closed).toBe(true);
  });
});
