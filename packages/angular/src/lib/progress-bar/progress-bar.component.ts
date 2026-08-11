import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-progress-bar",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-progress-bar">
      <div *ngIf="label || showValue" class="cp-progress-bar__header">
        <span *ngIf="label" class="cp-progress-bar__label" [id]="labelId">{{ label }}</span>
        <span *ngIf="showValue && !indeterminate">{{ roundedPercent }}%</span>
      </div>
      <div
        [class]="trackClasses"
        role="progressbar"
        [attr.aria-labelledby]="label ? labelId : null"
        [attr.aria-valuenow]="indeterminate ? null : value"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="max"
      >
        <div class="cp-progress-bar__fill" [style.width.%]="indeterminate ? null : percent"></div>
      </div>
    </div>
  `,
})
export class CpProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label = "";
  @Input() showValue = false;
  @Input() indeterminate = false;
  @Input() status: "default" | "danger" = "default";

  readonly labelId = `cp-progress-bar-${uniqueId++}`;

  get percent(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  get roundedPercent(): number {
    return Math.round(this.percent);
  }

  get trackClasses(): string {
    return [
      "cp-progress-bar__track",
      this.status === "danger" ? "cp-progress-bar--danger" : "",
      this.indeterminate ? "cp-progress-bar--indeterminate" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
}
