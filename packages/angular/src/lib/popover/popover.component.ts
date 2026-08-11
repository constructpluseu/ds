import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

let uniqueId = 0;

@Component({
  selector: "cp-popover",
  standalone: true,
  imports: [CommonModule],
  // Nota: sem OnPush deliberadamente — o gatilho é conteúdo projetado que chama
  // toggle()/close() através de uma variável de referência de template (#pop), uma
  // mutação externa que o OnPush não deteta automaticamente.
  template: `
    <div class="cp-popover-wrapper">
      <ng-content select="[cpPopoverTrigger]"></ng-content>
      <div
        *ngIf="open"
        [id]="panelId"
        role="dialog"
        [class]="panelClasses"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CpPopoverComponent {
  @Input() placement: "left" | "right" = "left";

  open = false;
  readonly panelId = `cp-popover-${uniqueId++}`;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  get panelClasses(): string {
    return ["cp-popover__panel", this.placement === "right" ? "cp-popover__panel--right" : ""]
      .filter(Boolean)
      .join(" ");
  }

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }
}
