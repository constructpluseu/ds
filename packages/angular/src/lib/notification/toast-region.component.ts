import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CpToastService } from "./toast.service";

@Component({
  selector: "cp-toast-region",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-toast-region" aria-live="polite" aria-atomic="true">
      <div
        *ngFor="let toast of toastService.toasts()"
        [class]="['cp-toast', 'cp-toast--' + toast.status]"
        [attr.role]="toast.status === 'danger' ? 'alert' : 'status'"
      >
        <div class="cp-notification__content">
          <p class="cp-notification__title">{{ toast.title }}</p>
          <p *ngIf="toast.description" class="cp-notification__description">{{ toast.description }}</p>
        </div>
        <button
          type="button"
          class="cp-notification__close"
          aria-label="Fechar notificação"
          (click)="toastService.dismiss(toast.id)"
        >
          ×
        </button>
      </div>
    </div>
  `,
})
export class CpToastRegionComponent {
  constructor(readonly toastService: CpToastService) {}
}
