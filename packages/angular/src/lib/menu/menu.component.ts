import {
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export interface CpMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  danger?: boolean;
}

let uniqueId = 0;

@Component({
  selector: "cp-menu",
  standalone: true,
  imports: [CommonModule],
  // Nota: sem OnPush deliberadamente — o gatilho é conteúdo projetado que chama
  // toggle() através de uma variável de referência de template (#menu), uma mutação
  // externa que o OnPush não deteta automaticamente.
  template: `
    <div class="cp-menu-wrapper">
      <ng-content select="[cpMenuTrigger]"></ng-content>
      <div
        *ngIf="open"
        [id]="panelId"
        role="menu"
        [attr.aria-label]="ariaLabel"
        class="cp-menu__panel"
        (keydown)="onMenuKeydown($event)"
      >
        <button
          #menuItem
          *ngFor="let item of items"
          type="button"
          role="menuitem"
          [disabled]="item.disabled"
          [class]="itemClasses(item)"
          (click)="select(item)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  `,
})
export class CpMenuComponent {
  @Input() items: CpMenuItem[] = [];
  @Input() ariaLabel = "Menu de ações";

  @ViewChildren("menuItem") menuItems!: QueryList<ElementRef<HTMLButtonElement>>;

  open = false;
  readonly panelId = `cp-menu-${uniqueId++}`;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  itemClasses(item: CpMenuItem): string {
    return ["cp-menu__item", item.danger ? "cp-menu__item--danger" : ""].filter(Boolean).join(" ");
  }

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  select(item: CpMenuItem): void {
    item.onSelect();
    this.close();
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }
    const enabled = this.items.filter((item) => !item.disabled);
    const buttons = this.menuItems.toArray().map((ref) => ref.nativeElement);
    const focusedIndex = buttons.findIndex((btn) => btn === document.activeElement);
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") nextIndex = (focusedIndex + 1) % enabled.length;
    else if (event.key === "ArrowUp") nextIndex = (focusedIndex - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabled.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      buttons[nextIndex]?.focus();
    }
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
