import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface SideNavLeafItem {
  id: string;
  label: string;
  href: string;
}

export interface SideNavItem extends SideNavLeafItem {
  children?: SideNavLeafItem[];
}

@Component({
  selector: "cp-side-nav",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class]="navClasses" [attr.aria-label]="label">
      <ul class="cp-side-nav__list">
        <li *ngFor="let item of items">
          <a
            *ngIf="!hasChildren(item)"
            [attr.href]="item.href"
            class="cp-side-nav__link"
            [attr.aria-current]="activeId === item.id ? 'page' : null"
            (click)="onNavigate(item, $event)"
          >
            {{ item.label }}
          </a>
          <ng-container *ngIf="hasChildren(item)">
            <button
              type="button"
              class="cp-side-nav__toggle"
              [attr.aria-expanded]="expandedIds.includes(item.id)"
              (click)="toggleExpand(item.id)"
            >
              <span class="cp-side-nav__toggle-label">{{ item.label }}</span>
              <span class="cp-side-nav__toggle-icon" aria-hidden="true">
                {{ expandedIds.includes(item.id) ? "▾" : "▸" }}
              </span>
            </button>
            <ul *ngIf="expandedIds.includes(item.id)" class="cp-side-nav__sublist">
              <li *ngFor="let child of item.children">
                <a
                  [attr.href]="child.href"
                  class="cp-side-nav__link"
                  [attr.aria-current]="activeId === child.id ? 'page' : null"
                  (click)="onNavigate(child, $event)"
                >
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </ng-container>
        </li>
      </ul>
    </nav>
  `,
})
export class CpSideNavComponent {
  @Input() label = "Navegação principal";
  @Input() items: SideNavItem[] = [];
  @Input() activeId: string | null = null;
  @Input() expandedIds: string[] = [];
  @Input() open = true;
  @Output() expandedChange = new EventEmitter<string[]>();
  /**
   * Emitido ao clicar num item folha, antes da navegação do browser. Chamar
   * `event.preventDefault()` cancela o `href` (ex.: router client-side,
   * verificação de permissão antes de navegar).
   */
  @Output() navigate = new EventEmitter<{ item: SideNavLeafItem; event: MouseEvent }>();

  get navClasses(): string {
    return ["cp-side-nav", this.open ? "" : "cp-side-nav--closed"].filter(Boolean).join(" ");
  }

  hasChildren(item: SideNavItem): boolean {
    return Boolean(item.children && item.children.length > 0);
  }

  toggleExpand(id: string): void {
    const next = new Set(this.expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedChange.emit(Array.from(next));
  }

  onNavigate(item: SideNavLeafItem, event: MouseEvent): void {
    this.navigate.emit({ item, event });
  }
}
