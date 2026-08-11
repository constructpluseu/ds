import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  formatDisplayDate,
  formatFullDate,
  formatMonthLabel,
  getMonthMatrix,
  isSameDay,
  parseISODate,
  toISODate,
} from "./date-utils";

let uniqueId = 0;

@Component({
  selector: "cp-date-picker",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <label *ngIf="label" [for]="inputId" class="cp-field__label">{{ label }}</label>
      <div class="cp-date-picker">
        <input
          [id]="inputId"
          type="text"
          readonly
          role="combobox"
          [disabled]="disabled"
          [class]="inputClasses"
          [placeholder]="placeholder"
          [value]="selectedDate ? formatDisplayDate(selectedDate) : ''"
          aria-haspopup="dialog"
          [attr.aria-expanded]="open"
          [attr.aria-controls]="panelId"
          [attr.aria-describedby]="errorText || helperText ? helperId : null"
          [attr.aria-invalid]="invalid ? 'true' : null"
          (click)="openPanel()"
          (keydown)="onInputKeydown($event)"
        />
        <div *ngIf="open" [id]="panelId" role="dialog" aria-label="Escolher data" class="cp-date-picker__panel">
          <div class="cp-date-picker__header">
            <button type="button" class="cp-date-picker__nav" aria-label="Mês anterior" (click)="changeMonth(-1)">‹</button>
            <span class="cp-date-picker__month-label">{{ formatMonthLabel(viewDate) }}</span>
            <button type="button" class="cp-date-picker__nav" aria-label="Mês seguinte" (click)="changeMonth(1)">›</button>
          </div>
          <div class="cp-date-picker__grid">
            <span *ngFor="let weekday of weekdayLabels" class="cp-date-picker__weekday">{{ weekday }}</span>
            <button
              *ngFor="let date of weeks"
              type="button"
              [attr.data-date]="toISODate(date)"
              [disabled]="isDisabledDate(date)"
              [tabIndex]="isSameDay(date, activeDate) ? 0 : -1"
              [attr.aria-pressed]="selectedDate ? isSameDay(date, selectedDate) : false"
              [attr.aria-current]="isSameDay(date, today) ? 'date' : null"
              [attr.aria-label]="formatFullDate(date)"
              [class]="dayClasses(date)"
              (click)="selectDate(date)"
              (keydown)="onDayKeydown($event)"
            >
              {{ date.getDate() }}
            </button>
          </div>
        </div>
      </div>
      <span *ngIf="errorText || helperText" [id]="helperId" [class]="helperClasses">
        {{ errorText || helperText }}
      </span>
    </div>
  `,
})
export class CpDatePickerComponent {
  @Input() label = "";
  @Input() value: string | null = null;
  @Input() placeholder = "dd/mm/aaaa";
  @Input() helperText = "";
  @Input() errorText = "";
  @Input() minDate = "";
  @Input() maxDate = "";
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string | null>();

  open = false;
  viewDate = new Date();
  activeDate = new Date();
  today = new Date();

  readonly weekdayLabels = WEEKDAY_LABELS;
  readonly inputId = `cp-date-picker-${uniqueId++}`;
  readonly panelId = `${this.inputId}-panel`;
  readonly helperId = `${this.inputId}-helper`;

  readonly toISODate = toISODate;
  readonly isSameDay = isSameDay;
  readonly formatMonthLabel = formatMonthLabel;
  readonly formatDisplayDate = formatDisplayDate;
  readonly formatFullDate = formatFullDate;

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get invalid(): boolean {
    return Boolean(this.errorText);
  }

  get selectedDate(): Date | null {
    return parseISODate(this.value);
  }

  get minDateValue(): Date | null {
    return parseISODate(this.minDate);
  }

  get maxDateValue(): Date | null {
    return parseISODate(this.maxDate);
  }

  get weeks(): Date[] {
    return getMonthMatrix(this.viewDate);
  }

  get inputClasses(): string {
    return [
      "cp-input",
      "cp-input--md",
      "cp-date-picker__input",
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

  dayClasses(date: Date): string {
    return [
      "cp-date-picker__day",
      date.getMonth() !== this.viewDate.getMonth() ? "cp-date-picker__day--outside" : "",
      isSameDay(date, this.today) ? "cp-date-picker__day--today" : "",
      this.selectedDate && isSameDay(date, this.selectedDate) ? "cp-date-picker__day--selected" : "",
      isSameDay(date, this.activeDate) ? "cp-date-picker__day--active" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  isDisabledDate(date: Date): boolean {
    if (this.minDateValue && date < this.minDateValue) return true;
    if (this.maxDateValue && date > this.maxDateValue) return true;
    return false;
  }

  selectDate(date: Date): void {
    if (this.isDisabledDate(date)) return;
    this.valueChange.emit(toISODate(date));
    this.open = false;
    this.hostRef.nativeElement.querySelector<HTMLInputElement>(`#${this.inputId}`)?.focus();
  }

  openPanel(): void {
    if (this.disabled) return;
    const base = this.selectedDate ?? new Date();
    this.viewDate = base;
    this.activeDate = base;
    this.open = true;
    this.focusActiveDay();
  }

  changeMonth(amount: number): void {
    this.viewDate = addMonths(this.viewDate, amount);
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      this.openPanel();
    }
  }

  onDayKeydown(event: KeyboardEvent): void {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in deltas) {
      event.preventDefault();
      const next = addDays(this.activeDate, deltas[event.key]);
      this.activeDate = next;
      if (next.getMonth() !== this.viewDate.getMonth() || next.getFullYear() !== this.viewDate.getFullYear()) {
        this.viewDate = next;
      }
      this.focusActiveDay();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.selectDate(this.activeDate);
    } else if (event.key === "Escape") {
      this.open = false;
      this.hostRef.nativeElement.querySelector<HTMLInputElement>(`#${this.inputId}`)?.focus();
    }
  }

  private focusActiveDay(): void {
    this.cdr.detectChanges();
    const key = toISODate(this.activeDate);
    this.hostRef.nativeElement.querySelector<HTMLButtonElement>(`[data-date="${key}"]`)?.focus();
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMousedown(event: MouseEvent): void {
    if (this.open && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
