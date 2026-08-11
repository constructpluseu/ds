import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CpTabPanelComponent } from "./tab-panel.component";

export interface CpTabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

let uniqueId = 0;

@Component({
  selector: "cp-tabs",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp-tabs">
      <div
        role="tablist"
        [attr.aria-label]="ariaLabel"
        class="cp-tabs__list"
        (keydown)="onKeydown($event)"
      >
        <button
          #tabButton
          *ngFor="let item of items"
          type="button"
          role="tab"
          [id]="idFor(item.id)"
          [attr.aria-selected]="item.id === activeId"
          [attr.aria-controls]="panelIdFor(item.id)"
          [disabled]="item.disabled"
          [attr.tabindex]="item.id === activeId ? 0 : -1"
          [class]="tabClasses(item)"
          (click)="selectTab(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class CpTabsComponent implements OnChanges, AfterContentChecked {
  @Input() items: CpTabItem[] = [];
  @Input() activeId = "";
  @Input() ariaLabel = "";
  @Output() activeIdChange = new EventEmitter<string>();

  @ViewChildren("tabButton") tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  @ContentChildren(CpTabPanelComponent, { descendants: true })
  panels?: QueryList<CpTabPanelComponent>;

  readonly instanceId = `cp-tabs-${uniqueId++}`;

  ngOnChanges(): void {
    if (!this.activeId) {
      const first = this.items.find((item) => !item.disabled) ?? this.items[0];
      if (first) {
        this.activeId = first.id;
      }
    }
  }

  ngAfterContentChecked(): void {
    this.panels?.forEach((panel) => {
      panel.updateState(panel.id === this.activeId, this.idFor(panel.id), this.panelIdFor(panel.id));
    });
  }

  idFor(id: string): string {
    return `${this.instanceId}-tab-${id}`;
  }

  panelIdFor(id: string): string {
    return `${this.instanceId}-panel-${id}`;
  }

  tabClasses(item: CpTabItem): string {
    return ["cp-tabs__tab", item.id === this.activeId ? "cp-tabs__tab--selected" : ""]
      .filter(Boolean)
      .join(" ");
  }

  selectTab(id: string): void {
    this.activeId = id;
    this.activeIdChange.emit(id);
  }

  onKeydown(event: KeyboardEvent): void {
    const enabled = this.items.filter((item) => !item.disabled);
    const currentIndex = enabled.findIndex((item) => item.id === this.activeId);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabled.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const next = enabled[nextIndex];
      this.selectTab(next.id);
      const nextIndexInAll = this.items.findIndex((item) => item.id === next.id);
      this.tabButtons.get(nextIndexInAll)?.nativeElement.focus();
    }
  }
}
