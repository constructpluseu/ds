import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-checkbox",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [for]="inputId" [class]="wrapperClasses">
      <input
        #inputEl
        type="checkbox"
        [id]="inputId"
        class="cp-checkbox__input"
        [disabled]="disabled"
        [checked]="checked"
        (change)="onChange($event)"
      />
      <span class="cp-checkbox__box" aria-hidden="true"></span>
      <span class="cp-checkbox__label">{{ label }}</span>
    </label>
  `,
})
export class CpCheckboxComponent implements AfterViewInit, OnChanges {
  @Input() label = "";
  @Input() disabled = false;
  @Input() checked = false;
  @Input() indeterminate = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild("inputEl") inputEl?: ElementRef<HTMLInputElement>;

  readonly inputId = `cp-checkbox-${uniqueId++}`;

  get wrapperClasses(): string {
    return ["cp-checkbox", this.disabled ? "cp-checkbox--disabled" : ""].filter(Boolean).join(" ");
  }

  ngAfterViewInit(): void {
    this.syncIndeterminate();
  }

  ngOnChanges(): void {
    this.syncIndeterminate();
  }

  private syncIndeterminate(): void {
    if (this.inputEl) {
      this.inputEl.nativeElement.indeterminate = this.indeterminate;
    }
  }

  onChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(this.checked);
  }
}
