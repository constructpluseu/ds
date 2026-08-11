import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import type { CpFieldSize } from "../text-input/text-input.component";

let uniqueId = 0;

@Component({
  selector: "cp-number-input",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <label *ngIf="label" [for]="inputId" [class]="labelClasses">{{ label }}</label>
      <div [class]="wrapperClasses">
        <button
          type="button"
          class="cp-number-input__step"
          aria-label="Diminuir"
          [disabled]="disabled || !canDecrement"
          (click)="valueChange.emit(clamp(value - step))"
        >
          −
        </button>
        <input
          [id]="inputId"
          type="number"
          [required]="required"
          [disabled]="disabled"
          [attr.min]="min"
          [attr.max]="max"
          [step]="step"
          [value]="value"
          [attr.aria-invalid]="invalid ? 'true' : null"
          [attr.aria-describedby]="errorText || helperText ? helperId : null"
          [class]="inputClasses"
          (input)="onInput($event)"
        />
        <button
          type="button"
          class="cp-number-input__step"
          aria-label="Aumentar"
          [disabled]="disabled || !canIncrement"
          (click)="valueChange.emit(clamp(value + step))"
        >
          +
        </button>
      </div>
      <span *ngIf="errorText || helperText" [id]="helperId" [class]="helperClasses">
        {{ errorText || helperText }}
      </span>
    </div>
  `,
})
export class CpNumberInputComponent {
  @Input() label = "";
  @Input() helperText = "";
  @Input() errorText = "";
  @Input() size: CpFieldSize = "md";
  @Input() required = false;
  @Input() disabled = false;
  @Input() value = 0;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step = 1;
  @Output() valueChange = new EventEmitter<number>();

  readonly inputId = `cp-number-input-${uniqueId++}`;
  readonly helperId = `${this.inputId}-helper`;

  get invalid(): boolean {
    return Boolean(this.errorText);
  }

  get canDecrement(): boolean {
    return this.min === undefined || this.value > this.min;
  }

  get canIncrement(): boolean {
    return this.max === undefined || this.value < this.max;
  }

  get labelClasses(): string {
    return ["cp-field__label", this.required ? "cp-field__label--required" : ""]
      .filter(Boolean)
      .join(" ");
  }

  get wrapperClasses(): string {
    return ["cp-number-input", this.invalid ? "cp-number-input--invalid" : ""]
      .filter(Boolean)
      .join(" ");
  }

  get inputClasses(): string {
    return ["cp-input", "cp-number-input__field", `cp-input--${this.size}`].join(" ");
  }

  get helperClasses(): string {
    return ["cp-field__helper", this.errorText ? "cp-field__helper--error" : ""]
      .filter(Boolean)
      .join(" ");
  }

  clamp(next: number): number {
    let result = next;
    if (this.min !== undefined) result = Math.max(this.min, result);
    if (this.max !== undefined) result = Math.min(this.max, result);
    return result;
  }

  onInput(event: Event): void {
    this.valueChange.emit(this.clamp(Number((event.target as HTMLInputElement).value)));
  }
}
