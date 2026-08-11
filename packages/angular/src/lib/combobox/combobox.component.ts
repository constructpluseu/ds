import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export interface CpComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let uniqueId = 0;

@Component({
  selector: "cp-combobox",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <label *ngIf="label" [for]="inputId" class="cp-field__label">{{ label }}</label>
      <div class="cp-combobox">
        <div *ngIf="multiple && selectedOptions.length > 0" class="cp-combobox__tags">
          <span *ngFor="let option of selectedOptions" class="cp-tag cp-tag--info">
            {{ option.label }}
            <button
              type="button"
              class="cp-tag__remove"
              [attr.aria-label]="'Remover ' + option.label"
              (click)="toggleValue(option.value)"
            >
              ×
            </button>
          </span>
        </div>
        <input
          [id]="inputId"
          role="combobox"
          [attr.aria-expanded]="open"
          [attr.aria-controls]="listboxId"
          aria-autocomplete="list"
          [attr.aria-invalid]="invalid ? 'true' : null"
          [attr.aria-describedby]="errorText || helperText ? helperId : null"
          [class]="inputClasses"
          [placeholder]="placeholder"
          [value]="displayValue"
          autocomplete="off"
          (input)="onInput($event)"
          (focus)="open = true"
          (keydown)="onKeydown($event)"
        />
        <ul
          *ngIf="open"
          [id]="listboxId"
          role="listbox"
          class="cp-combobox__listbox"
          [attr.aria-multiselectable]="multiple ? 'true' : null"
        >
          <li *ngIf="filtered.length === 0" class="cp-combobox__empty">Sem resultados</li>
          <li
            *ngFor="let option of filtered; let i = index"
            role="option"
            [attr.aria-selected]="value.includes(option.value)"
            [attr.aria-disabled]="option.disabled"
            [class]="optionClasses(option, i)"
            (mousedown)="onOptionMouseDown($event, option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
      <span *ngIf="errorText || helperText" [id]="helperId" [class]="helperClasses">
        {{ errorText || helperText }}
      </span>
    </div>
  `,
})
export class CpComboboxComponent {
  @Input() label = "";
  @Input() options: CpComboboxOption[] = [];
  @Input() value: string[] = [];
  @Input() multiple = false;
  @Input() placeholder = "Selecione…";
  @Input() helperText = "";
  @Input() errorText = "";
  @Output() valueChange = new EventEmitter<string[]>();

  open = false;
  query = "";
  activeIndex = 0;

  readonly inputId = `cp-combobox-${uniqueId++}`;
  readonly listboxId = `${this.inputId}-listbox`;
  readonly helperId = `${this.inputId}-helper`;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  get invalid(): boolean {
    return Boolean(this.errorText);
  }

  get filtered(): CpComboboxOption[] {
    return this.options.filter((option) =>
      option.label.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  get selectedOptions(): CpComboboxOption[] {
    return this.options.filter((option) => this.value.includes(option.value));
  }

  get displayValue(): string {
    if (this.open || this.multiple) return this.query;
    return this.selectedOptions[0]?.label ?? "";
  }

  get inputClasses(): string {
    return [
      "cp-input",
      "cp-input--md",
      "cp-combobox__input",
      this.invalid ? "cp-input--invalid" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  get helperClasses(): string {
    return ["cp-field__helper", this.errorText ? "cp-field__helper--error" : ""]
      .filter(Boolean)
      .join(" ");
  }

  optionClasses(option: CpComboboxOption, index: number): string {
    return [
      "cp-combobox__option",
      index === this.activeIndex ? "cp-combobox__option--active" : "",
      this.value.includes(option.value) ? "cp-combobox__option--selected" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  toggleValue(optionValue: string): void {
    if (this.multiple) {
      const next = this.value.includes(optionValue)
        ? this.value.filter((v) => v !== optionValue)
        : [...this.value, optionValue];
      this.valueChange.emit(next);
      this.query = "";
    } else {
      this.valueChange.emit([optionValue]);
      this.open = false;
      this.query = "";
    }
  }

  onOptionMouseDown(event: MouseEvent, option: CpComboboxOption): void {
    event.preventDefault();
    if (!option.disabled) this.toggleValue(option.value);
  }

  onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = 0;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.open) {
        this.open = true;
        return;
      }
      this.activeIndex = Math.min(this.activeIndex + 1, this.filtered.length - 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = this.filtered[this.activeIndex];
      if (option && !option.disabled) this.toggleValue(option.value);
    } else if (event.key === "Escape") {
      this.open = false;
    }
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
      this.query = "";
    }
  }
}
