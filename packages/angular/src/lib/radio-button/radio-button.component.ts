import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-radio-button",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [for]="inputId" [class]="wrapperClasses">
      <input
        type="radio"
        [id]="inputId"
        class="cp-radio__input"
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        [checked]="checked"
        (change)="onChange()"
      />
      <span class="cp-radio__circle" aria-hidden="true"></span>
      <span class="cp-radio__label">{{ label }}</span>
    </label>
  `,
})
export class CpRadioButtonComponent {
  @Input() label = "";
  @Input() name = "";
  @Input() value = "";
  @Input() disabled = false;
  @Input() checked = false;
  @Output() valueChange = new EventEmitter<string>();

  readonly inputId = `cp-radio-${uniqueId++}`;

  get wrapperClasses(): string {
    return ["cp-radio", this.disabled ? "cp-radio--disabled" : ""].filter(Boolean).join(" ");
  }

  onChange(): void {
    this.valueChange.emit(this.value);
  }
}
