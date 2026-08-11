import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

let uniqueId = 0;

@Component({
  selector: "cp-modal",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="open" class="cp-modal-overlay" (mousedown)="onBackdropMouseDown($event)">
      <div
        #dialog
        [class]="dialogClasses"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="titleId"
      >
        <div class="cp-modal__header">
          <h2 class="cp-modal__title" [id]="titleId">{{ title }}</h2>
          <button type="button" class="cp-modal__close" aria-label="Fechar" (click)="close.emit()">×</button>
        </div>
        <div class="cp-modal__body">
          <ng-content></ng-content>
        </div>
        <div *ngIf="hasFooter" class="cp-modal__footer">
          <ng-content select="[cpModalFooter]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CpModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() title = "";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() dismissOnBackdropClick = true;
  @Input() hasFooter = false;
  @Output() close = new EventEmitter<void>();

  readonly titleId = `cp-modal-title-${uniqueId++}`;

  private previouslyFocused: HTMLElement | null = null;
  private previousOverflow = "";

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  get dialogClasses(): string {
    return ["cp-modal", `cp-modal--${this.size}`].join(" ");
  }

  ngOnChanges(): void {
    if (this.open) {
      this.onOpen();
    } else {
      this.onCloseCleanup();
    }
  }

  ngOnDestroy(): void {
    if (this.open) {
      this.onCloseCleanup();
    }
  }

  onBackdropMouseDown(event: MouseEvent): void {
    if (this.dismissOnBackdropClick && event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.open) return;
    if (event.key === "Escape") {
      this.close.emit();
      return;
    }
    if (event.key !== "Tab") return;

    const dialog = this.hostRef.nativeElement.querySelector<HTMLElement>('[role="dialog"]');
    if (!dialog) return;
    const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private onOpen(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const dialog = this.hostRef.nativeElement.querySelector<HTMLElement>('[role="dialog"]');
      dialog?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    });
  }

  private onCloseCleanup(): void {
    document.body.style.overflow = this.previousOverflow;
    this.previouslyFocused?.focus();
  }
}
