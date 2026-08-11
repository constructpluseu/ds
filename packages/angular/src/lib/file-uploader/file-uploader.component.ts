import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-file-uploader",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-field">
      <span *ngIf="label" class="cp-field__label">{{ label }}</span>
      <div class="cp-file-uploader">
        <label
          [class]="dropzoneClasses"
          (dragover)="onDragOver($event)"
          (dragleave)="dragging = false"
          (drop)="onDrop($event)"
        >
          <input
            type="file"
            class="cp-visually-hidden"
            [attr.accept]="accept || null"
            [multiple]="multiple"
            [disabled]="disabled"
            (change)="onInputChange($event)"
          />
          <span class="cp-file-uploader__icon" aria-hidden="true">↑</span>
          <span class="cp-file-uploader__hint">Arraste ficheiros para aqui ou clique para procurar</span>
        </label>
        <ul *ngIf="value.length > 0" class="cp-file-uploader__list">
          <li *ngFor="let file of value; let i = index" [class]="itemClasses(file)">
            <span class="cp-file-uploader__item-name">{{ file.name }}</span>
            <span class="cp-file-uploader__item-size">
              {{ isOversize(file) ? "Excede o tamanho máximo" : formatBytes(file.size) }}
            </span>
            <button
              type="button"
              class="cp-file-uploader__item-remove"
              [attr.aria-label]="'Remover ' + file.name"
              (click)="removeAt(i)"
            >
              ×
            </button>
          </li>
        </ul>
      </div>
      <span *ngIf="errorText || helperText" [class]="helperClasses">{{ errorText || helperText }}</span>
    </div>
  `,
})
export class CpFileUploaderComponent {
  @Input() label = "";
  @Input() value: File[] = [];
  @Input() accept = "";
  @Input() multiple = false;
  @Input() maxSizeBytes: number | null = null;
  @Input() helperText = "";
  @Input() errorText = "";
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<File[]>();

  dragging = false;

  get dropzoneClasses(): string {
    return [
      "cp-file-uploader__dropzone",
      this.dragging ? "cp-file-uploader__dropzone--dragging" : "",
      this.errorText ? "cp-file-uploader__dropzone--invalid" : "",
      this.disabled ? "cp-file-uploader__dropzone--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  get helperClasses(): string {
    return ["cp-field__helper", this.errorText ? "cp-field__helper--error" : ""]
      .filter(Boolean)
      .join(" ");
  }

  itemClasses(file: File): string {
    return ["cp-file-uploader__item", this.isOversize(file) ? "cp-file-uploader__item--invalid" : ""]
      .filter(Boolean)
      .join(" ");
  }

  isOversize(file: File): boolean {
    return Boolean(this.maxSizeBytes) && file.size > (this.maxSizeBytes as number);
  }

  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private addFiles(list: FileList | null): void {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    this.valueChange.emit(this.multiple ? [...this.value, ...incoming] : incoming.slice(0, 1));
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.addFiles(target.files);
    target.value = "";
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled) this.dragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    if (this.disabled) return;
    this.addFiles(event.dataTransfer?.files ?? null);
  }

  removeAt(index: number): void {
    this.valueChange.emit(this.value.filter((_, i) => i !== index));
  }
}
