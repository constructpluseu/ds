import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-toggletip",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="cp-toggletip-wrapper">
      <button
        type="button"
        class="cp-toggletip__trigger"
        [attr.aria-expanded]="open"
        [attr.aria-controls]="panelId"
        [attr.aria-label]="ariaLabel"
        (click)="open = !open"
      >
        ?
      </button>
      <span *ngIf="open" [id]="panelId" role="status" class="cp-toggletip__panel">
        <ng-content></ng-content>
      </span>
    </span>
  `,
})
export class CpToggletipComponent {
  @Input() ariaLabel = "Mais informação";

  open = false;
  readonly panelId = `cp-toggletip-${uniqueId++}`;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    this.open = false;
  }
}
