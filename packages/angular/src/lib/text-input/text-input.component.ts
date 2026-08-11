import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpFieldSize = "sm" | "md" | "lg";

let uniqueId = 0;

@Component({
  selector: "cp-text-input",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <label *ngIf="label" [for]="inputId" [class]="labelClasses">{{ label }}</label>
      <input
        [id]="inputId"
        [type]="type"
        [required]="required"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [value]="value"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [attr.aria-describedby]="errorText || helperText ? helperId : null"
        [class]="inputClasses"
        (input)="onInput($event)"
      />
      <span *ngIf="errorText || helperText" [id]="helperId" [class]="helperClasses">
        {{ errorText || helperText }}
      </span>
    </div>
  `,
})
export class CpTextInputComponent {
  @Input() label = "";
  @Input() helperText = "";
  @Input() errorText = "";
  @Input() size: CpFieldSize = "md";
  @Input() required = false;
  @Input() disabled = false;
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();

  readonly inputId = `cp-text-input-${uniqueId++}`;
  readonly helperId = `${this.inputId}-helper`;

  get invalid(): boolean {
    return Boolean(this.errorText);
  }

  get labelClasses(): string {
    return ["cp-field__label", this.required ? "cp-field__label--required" : ""]
      .filter(Boolean)
      .join(" ");
  }

  get inputClasses(): string {
    return ["cp-input", `cp-input--${this.size}`, this.invalid ? "cp-input--invalid" : ""]
      .filter(Boolean)
      .join(" ");
  }

  get helperClasses(): string {
    return ["cp-field__helper", this.errorText ? "cp-field__helper--error" : ""]
      .filter(Boolean)
      .join(" ");
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
