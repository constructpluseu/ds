import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-slider",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <div *ngIf="label || showValue" class="cp-progress-bar__header">
        <label *ngIf="label" [for]="inputId" class="cp-field__label">{{ label }}</label>
        <span *ngIf="showValue" class="cp-slider-field__value">{{ value }}</span>
      </div>
      <input
        [id]="inputId"
        type="range"
        class="cp-slider"
        [attr.min]="min"
        [attr.max]="max"
        [step]="step"
        [value]="value"
        (input)="onInput($event)"
      />
    </div>
  `,
})
export class CpSliderComponent {
  @Input() label = "";
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() showValue = true;
  @Output() valueChange = new EventEmitter<number>();

  readonly inputId = `cp-slider-${uniqueId++}`;

  onInput(event: Event): void {
    this.valueChange.emit(Number((event.target as HTMLInputElement).value));
  }
}
