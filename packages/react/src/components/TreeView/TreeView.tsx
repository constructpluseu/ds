import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { flattenTree } from "./treeUtils";
import type { TreeNode } from "./treeUtils";

export type { TreeNode };

export interface TreeViewProps {
  label: string;
  nodes: TreeNode[];
  expandedIds: string[];
  onExpandedChange: (ids: string[]) => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export function TreeView({
  label,
  nodes,
  expandedIds,
  onExpandedChange,
  selectedId = null,
  onSelect,
}: TreeViewProps) {
  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);
  const flat = useMemo(() => flattenTree(nodes, expandedSet), [nodes, expandedSet]);
  const [activeId, setActiveId] = useState<string | null>(selectedId ?? flat[0]?.node.id ?? null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    if (activeId && flat.some((flatNode) => flatNode.node.id === activeId)) return;
    setActiveId(flat[0]?.node.id ?? null);
  }, [flat, activeId]);

  useEffect(() => {
    if (activeId) itemRefs.current.get(activeId)?.focus();
  }, [activeId]);

  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    flat.forEach((flatNode, index) => map.set(flatNode.node.id, index));
    return map;
  }, [flat]);

  function toggleExpand(id: string) {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onExpandedChange(Array.from(next));
  }

  function selectNode(flatNode: (typeof flat)[number]) {
    if (flatNode.node.disabled) return;
    setActiveId(flatNode.node.id);
    onSelect?.(flatNode.node.id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLLIElement>, flatNode: (typeof flat)[number]) {
    const index = indexById.get(flatNode.node.id) ?? -1;
    const hasChildren = Boolean(flatNode.node.children && flatNode.node.children.length > 0);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = flat[index + 1];
      if (next) setActiveId(next.node.id);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = flat[index - 1];
      if (prev) setActiveId(prev.node.id);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (hasChildren && !expandedSet.has(flatNode.node.id)) {
        toggleExpand(flatNode.node.id);
      } else if (hasChildren) {
        const child = flat[index + 1];
        if (child && child.parentId === flatNode.node.id) setActiveId(child.node.id);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (hasChildren && expandedSet.has(flatNode.node.id)) {
        toggleExpand(flatNode.node.id);
      } else if (flatNode.parentId) {
        setActiveId(flatNode.parentId);
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectNode(flatNode);
    }
  }

  return (
    <ul className="cp-tree-view" role="tree" aria-label={label}>
      {flat.map((flatNode) => {
        const { node, depth, posInSet, setSize } = flatNode;
        const hasChildren = Boolean(node.children && node.children.length > 0);
        const expanded = expandedSet.has(node.id);
        const selected = selectedId === node.id;
        const active = activeId === node.id;
        return (
          <li
            key={node.id}
            ref={(el) => {
              if (el) itemRefs.current.set(node.id, el);
              else itemRefs.current.delete(node.id);
            }}
            role="treeitem"
            aria-selected={selected}
            aria-expanded={hasChildren ? expanded : undefined}
            aria-disabled={node.disabled || undefined}
            aria-level={depth + 1}
            aria-posinset={posInSet}
            aria-setsize={setSize}
            tabIndex={active ? 0 : -1}
            className={[
              "cp-tree-view__item",
              selected ? "cp-tree-view__item--selected" : "",
              node.disabled ? "cp-tree-view__item--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onKeyDown={(event) => onKeyDown(event, flatNode)}
            onFocus={() => setActiveId(node.id)}
            onClick={() => selectNode(flatNode)}
          >
            <div className="cp-tree-view__row" style={{ "--cp-tree-depth": depth } as CSSProperties}>
              {hasChildren ? (
                <button
                  type="button"
                  className="cp-tree-view__twisty"
                  tabIndex={-1}
                  aria-label={expanded ? "Recolher" : "Expandir"}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleExpand(node.id);
                  }}
                >
                  {expanded ? "▾" : "▸"}
                </button>
              ) : (
                <span className="cp-tree-view__twisty-spacer" aria-hidden="true" />
              )}
              <span className="cp-tree-view__label">{node.label}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
