import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-toggle",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [for]="inputId" [class]="wrapperClasses">
      <input
        type="checkbox"
        role="switch"
        [id]="inputId"
        class="cp-toggle__input"
        [disabled]="disabled"
        [checked]="checked"
        (change)="onChange($event)"
      />
      <span class="cp-toggle__track" aria-hidden="true">
        <span class="cp-toggle__thumb"></span>
      </span>
      <span>{{ label }}</span>
    </label>
  `,
})
export class CpToggleComponent {
  @Input() label = "";
  @Input() disabled = false;
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  readonly inputId = `cp-toggle-${uniqueId++}`;

  get wrapperClasses(): string {
    return ["cp-toggle", this.disabled ? "cp-toggle--disabled" : ""].filter(Boolean).join(" ");
  }

  onChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(this.checked);
  }
}
