import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { flattenTree } from "./tree-utils";
import type { FlatTreeNode, TreeNode } from "./tree-utils";

export type { TreeNode };

@Component({
  selector: "cp-tree-view",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="cp-tree-view" role="tree" [attr.aria-label]="label">
      <li
        *ngFor="let flatNode of flat"
        [attr.data-node-id]="flatNode.node.id"
        role="treeitem"
        [attr.aria-selected]="selectedId === flatNode.node.id"
        [attr.aria-expanded]="hasChildren(flatNode) ? expandedSet.has(flatNode.node.id) : null"
        [attr.aria-disabled]="flatNode.node.disabled || null"
        [attr.aria-level]="flatNode.depth + 1"
        [attr.aria-posinset]="flatNode.posInSet"
        [attr.aria-setsize]="flatNode.setSize"
        [tabIndex]="activeId === flatNode.node.id ? 0 : -1"
        [class]="itemClasses(flatNode)"
        (keydown)="onKeydown($event, flatNode)"
        (focus)="activeId = flatNode.node.id"
        (click)="selectNode(flatNode)"
      >
        <div class="cp-tree-view__row" [style.--cp-tree-depth]="flatNode.depth">
          <button
            *ngIf="hasChildren(flatNode)"
            type="button"
            class="cp-tree-view__twisty"
            tabindex="-1"
            [attr.aria-label]="expandedSet.has(flatNode.node.id) ? 'Recolher' : 'Expandir'"
            (click)="onTwistyClick($event, flatNode)"
          >
            {{ expandedSet.has(flatNode.node.id) ? "▾" : "▸" }}
          </button>
          <span *ngIf="!hasChildren(flatNode)" class="cp-tree-view__twisty-spacer" aria-hidden="true"></span>
          <span class="cp-tree-view__label">{{ flatNode.node.label }}</span>
        </div>
      </li>
    </ul>
  `,
})
export class CpTreeViewComponent implements OnChanges {
  @Input() label = "";
  @Input() nodes: TreeNode[] = [];
  @Input() expandedIds: string[] = [];
  @Input() selectedId: string | null = null;
  @Output() expandedChange = new EventEmitter<string[]>();
  @Output() select = new EventEmitter<string>();

  activeId: string | null = null;
  expandedSet = new Set<string>();
  flat: FlatTreeNode[] = [];

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["expandedIds"]) this.expandedSet = new Set(this.expandedIds);
    if (changes["nodes"] || changes["expandedIds"] || changes["selectedId"]) {
      this.flat = flattenTree(this.nodes, this.expandedSet);
      if (!this.activeId || !this.flat.some((flatNode) => flatNode.node.id === this.activeId)) {
        this.activeId = this.selectedId ?? this.flat[0]?.node.id ?? null;
      }
    }
  }

  hasChildren(flatNode: FlatTreeNode): boolean {
    return Boolean(flatNode.node.children && flatNode.node.children.length > 0);
  }

  itemClasses(flatNode: FlatTreeNode): string {
    return [
      "cp-tree-view__item",
      this.selectedId === flatNode.node.id ? "cp-tree-view__item--selected" : "",
      flatNode.node.disabled ? "cp-tree-view__item--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private toggleExpand(id: string): void {
    const next = new Set(this.expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedChange.emit(Array.from(next));
  }

  selectNode(flatNode: FlatTreeNode): void {
    if (flatNode.node.disabled) return;
    this.activeId = flatNode.node.id;
    this.select.emit(flatNode.node.id);
  }

  onTwistyClick(event: MouseEvent, flatNode: FlatTreeNode): void {
    event.stopPropagation();
    this.toggleExpand(flatNode.node.id);
  }

  private focusActive(): void {
    this.cdr.detectChanges();
    if (!this.activeId) return;
    this.hostRef.nativeElement
      .querySelector<HTMLLIElement>(`[data-node-id="${this.activeId}"]`)
      ?.focus();
  }

  onKeydown(event: KeyboardEvent, flatNode: FlatTreeNode): void {
    const flat = this.flat;
    const index = flat.findIndex((f) => f.node.id === flatNode.node.id);
    const hasChildren = this.hasChildren(flatNode);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = flat[index + 1];
      if (next) {
        this.activeId = next.node.id;
        this.focusActive();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = flat[index - 1];
      if (prev) {
        this.activeId = prev.node.id;
        this.focusActive();
      }
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (hasChildren && !this.expandedSet.has(flatNode.node.id)) {
        this.toggleExpand(flatNode.node.id);
      } else if (hasChildren) {
        const child = flat[index + 1];
        if (child && child.parentId === flatNode.node.id) {
          this.activeId = child.node.id;
          this.focusActive();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (hasChildren && this.expandedSet.has(flatNode.node.id)) {
        this.toggleExpand(flatNode.node.id);
      } else if (flatNode.parentId) {
        this.activeId = flatNode.parentId;
        this.focusActive();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.selectNode(flatNode);
    }
  }
}
