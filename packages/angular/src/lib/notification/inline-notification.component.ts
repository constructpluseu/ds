import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpNotificationStatus = "info" | "success" | "warning" | "danger";

@Component({
  selector: "cp-inline-notification",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses" [attr.role]="status === 'danger' ? 'alert' : 'status'">
      <span class="cp-notification__icon" aria-hidden="true"></span>
      <div class="cp-notification__content">
        <p class="cp-notification__title">{{ title }}</p>
        <p *ngIf="description" class="cp-notification__description">{{ description }}</p>
      </div>
      <button
        *ngIf="dismissible"
        type="button"
        class="cp-notification__close"
        aria-label="Fechar notificação"
        (click)="close.emit()"
      >
        ×
      </button>
    </div>
  `,
})
export class CpInlineNotificationComponent {
  @Input() status: CpNotificationStatus = "info";
  @Input() title = "";
  @Input() description = "";
  @Input() dismissible = false;
  @Output() close = new EventEmitter<void>();

  get wrapperClasses(): string {
    return ["cp-notification", `cp-notification--${this.status}`].join(" ");
  }
}
