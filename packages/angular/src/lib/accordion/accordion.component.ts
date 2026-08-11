import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CpAccordionPanelComponent } from "./accordion-panel.component";

export interface CpAccordionItem {
  id: string;
  title: string;
  disabled?: boolean;
}

let uniqueId = 0;

@Component({
  selector: "cp-accordion",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-accordion">
      <div *ngFor="let item of items; let i = index" class="cp-accordion__item">
        <h3 class="cp-accordion__header">
          <button
            #headerButton
            type="button"
            [id]="headerIdFor(item.id)"
            [class]="triggerClasses(item)"
            [attr.aria-expanded]="isOpen(item.id)"
            [attr.aria-controls]="panelIdFor(item.id)"
            [disabled]="item.disabled"
            (click)="toggle(item.id)"
            (keydown)="onKeydown($event, i)"
          >
            <span class="cp-accordion__icon" aria-hidden="true"></span>
            {{ item.title }}
          </button>
        </h3>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class CpAccordionComponent implements AfterContentChecked {
  @Input() items: CpAccordionItem[] = [];
  @Input() allowMultiple = false;
  @Input() defaultOpenIds: string[] = [];

  @ViewChildren("headerButton") headerButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  @ContentChildren(CpAccordionPanelComponent, { descendants: true })
  panels?: QueryList<CpAccordionPanelComponent>;

  private openIds: string[] = [];
  private initialized = false;
  readonly instanceId = `cp-accordion-${uniqueId++}`;

  ngAfterContentChecked(): void {
    if (!this.initialized) {
      this.openIds = [...this.defaultOpenIds];
      this.initialized = true;
    }
    this.panels?.forEach((panel) => {
      panel.updateState(
        this.isOpen(panel.id),
        this.headerIdFor(panel.id),
        this.panelIdFor(panel.id)
      );
    });
  }

  headerIdFor(id: string): string {
    return `${this.instanceId}-header-${id}`;
  }

  panelIdFor(id: string): string {
    return `${this.instanceId}-panel-${id}`;
  }

  isOpen(id: string): boolean {
    return this.openIds.includes(id);
  }

  triggerClasses(item: CpAccordionItem): string {
    return ["cp-accordion__trigger", this.isOpen(item.id) ? "cp-accordion__trigger--open" : ""]
      .filter(Boolean)
      .join(" ");
  }

  toggle(id: string): void {
    const open = this.isOpen(id);
    if (this.allowMultiple) {
      this.openIds = open ? this.openIds.filter((openId) => openId !== id) : [...this.openIds, id];
    } else {
      this.openIds = open ? [] : [id];
    }
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % this.items.length;
    else if (event.key === "ArrowUp") nextIndex = (index - 1 + this.items.length) % this.items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = this.items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      this.headerButtons.get(nextIndex)?.nativeElement.focus();
    }
  }
}
