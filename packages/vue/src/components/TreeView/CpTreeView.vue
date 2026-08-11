<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { flattenTree } from "./treeUtils";
import type { FlatTreeNode, TreeNode } from "./types";

const props = withDefaults(
  defineProps<{
    label: string;
    nodes: TreeNode[];
    expandedIds: string[];
    selectedId?: string | null;
  }>(),
  { selectedId: null }
);
const emit = defineEmits<{
  expandedChange: [ids: string[]];
  select: [id: string];
}>();

const expandedSet = computed(() => new Set(props.expandedIds));
const flat = computed(() => flattenTree(props.nodes, expandedSet.value));
const activeId = ref<string | null>(props.selectedId ?? flat.value[0]?.node.id ?? null);
const itemRefs = new Map<string, HTMLLIElement>();

function setItemRef(id: string, el: unknown) {
  if (el) itemRefs.set(id, el as HTMLLIElement);
  else itemRefs.delete(id);
}

watch(flat, (newFlat) => {
  if (activeId.value && newFlat.some((flatNode) => flatNode.node.id === activeId.value)) return;
  activeId.value = newFlat[0]?.node.id ?? null;
});

watch(activeId, async (id) => {
  if (!id) return;
  await nextTick();
  itemRefs.get(id)?.focus();
});

const indexById = computed(() => {
  const map = new Map<string, number>();
  flat.value.forEach((flatNode, index) => map.set(flatNode.node.id, index));
  return map;
});

function toggleExpand(id: string) {
  const next = new Set(props.expandedIds);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  emit("expandedChange", Array.from(next));
}

function selectNode(flatNode: FlatTreeNode) {
  if (flatNode.node.disabled) return;
  activeId.value = flatNode.node.id;
  emit("select", flatNode.node.id);
}

function onKeydown(event: KeyboardEvent, flatNode: FlatTreeNode) {
  const index = indexById.value.get(flatNode.node.id) ?? -1;
  const hasChildren = Boolean(flatNode.node.children && flatNode.node.children.length > 0);

  if (event.key === "ArrowDown") {
    event.preventDefault();
    const next = flat.value[index + 1];
    if (next) activeId.value = next.node.id;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    const prev = flat.value[index - 1];
    if (prev) activeId.value = prev.node.id;
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    if (hasChildren && !expandedSet.value.has(flatNode.node.id)) {
      toggleExpand(flatNode.node.id);
    } else if (hasChildren) {
      const child = flat.value[index + 1];
      if (child && child.parentId === flatNode.node.id) activeId.value = child.node.id;
    }
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    if (hasChildren && expandedSet.value.has(flatNode.node.id)) {
      toggleExpand(flatNode.node.id);
    } else if (flatNode.parentId) {
      activeId.value = flatNode.parentId;
    }
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectNode(flatNode);
  }
}
</script>

<template>
  <ul class="cp-tree-view" role="tree" :aria-label="label">
    <li
      v-for="flatNode in flat"
      :key="flatNode.node.id"
      :ref="(el) => setItemRef(flatNode.node.id, el)"
      role="treeitem"
      :aria-selected="selectedId === flatNode.node.id"
      :aria-expanded="flatNode.node.children?.length ? expandedSet.has(flatNode.node.id) : undefined"
      :aria-disabled="flatNode.node.disabled || undefined"
      :aria-level="flatNode.depth + 1"
      :aria-posinset="flatNode.posInSet"
      :aria-setsize="flatNode.setSize"
      :tabindex="activeId === flatNode.node.id ? 0 : -1"
      :class="[
        'cp-tree-view__item',
        selectedId === flatNode.node.id && 'cp-tree-view__item--selected',
        flatNode.node.disabled && 'cp-tree-view__item--disabled',
      ]"
      @keydown="onKeydown($event, flatNode)"
      @focus="activeId = flatNode.node.id"
      @click="selectNode(flatNode)"
    >
      <div class="cp-tree-view__row" :style="{ '--cp-tree-depth': flatNode.depth }">
        <button
          v-if="flatNode.node.children?.length"
          type="button"
          class="cp-tree-view__twisty"
          tabindex="-1"
          :aria-label="expandedSet.has(flatNode.node.id) ? 'Recolher' : 'Expandir'"
          @click.stop="toggleExpand(flatNode.node.id)"
        >
          {{ expandedSet.has(flatNode.node.id) ? "▾" : "▸" }}
        </button>
        <span v-else class="cp-tree-view__twisty-spacer" aria-hidden="true"></span>
        <span class="cp-tree-view__label">{{ flatNode.node.label }}</span>
      </div>
    </li>
  </ul>
</template>
