import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpTagStatus = "neutral" | "info" | "success" | "warning" | "danger";

@Component({
  selector: "cp-tag",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="wrapperClasses">
      <ng-content></ng-content>
      <button
        *ngIf="removable"
        type="button"
        class="cp-tag__remove"
        aria-label="Remover"
        (click)="remove.emit()"
      >
        ×
      </button>
    </span>
  `,
})
export class CpTagComponent {
  @Input() status: CpTagStatus = "neutral";
  @Input() removable = false;
  @Output() remove = new EventEmitter<void>();

  get wrapperClasses(): string {
    return ["cp-tag", `cp-tag--${this.status}`].join(" ");
  }
}
