import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import type { CpFieldSize } from "../text-input/text-input.component";

let uniqueId = 0;

@Component({
  selector: "cp-search",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-search">
      <span class="cp-search__icon" aria-hidden="true"></span>
      <label [for]="inputId" class="cp-visually-hidden">{{ label }}</label>
      <input
        [id]="inputId"
        type="search"
        role="searchbox"
        [placeholder]="label"
        [value]="value"
        [class]="inputClasses"
        (input)="onInput($event)"
      />
      <button
        *ngIf="showClear"
        type="button"
        class="cp-search__clear"
        aria-label="Limpar pesquisa"
        (click)="onClear()"
      >
        ×
      </button>
    </div>
  `,
})
export class CpSearchComponent {
  @Input() label = "Pesquisar";
  @Input() size: CpFieldSize = "md";
  @Input() value = "";
  @Input() clearable = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  readonly inputId = `cp-search-${uniqueId++}`;

  get showClear(): boolean {
    return this.clearable && Boolean(this.value);
  }

  get inputClasses(): string {
    return [
      "cp-input",
      "cp-search__field",
      this.showClear ? "cp-search__field--clearable" : "",
      `cp-input--${this.size}`,
    ]
      .filter(Boolean)
      .join(" ");
  }

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }

  onClear(): void {
    this.valueChange.emit("");
    this.clear.emit();
  }
}
