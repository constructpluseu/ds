<script setup lang="ts">
import { ref, useId } from "vue";
import type { CpAccordionItem } from "./types";

const props = withDefaults(
  defineProps<{ items: CpAccordionItem[]; allowMultiple?: boolean; defaultOpenIds?: string[] }>(),
  { allowMultiple: false, defaultOpenIds: () => [] }
);

const idBase = useId();
const openIds = ref<string[]>([...props.defaultOpenIds]);

function isOpen(id: string): boolean {
  return openIds.value.includes(id);
}

function toggle(id: string) {
  const open = isOpen(id);
  if (props.allowMultiple) {
    openIds.value = open ? openIds.value.filter((openId) => openId !== id) : [...openIds.value, id];
  } else {
    openIds.value = open ? [] : [id];
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  let nextIndex: number | null = null;
  if (event.key === "ArrowDown") nextIndex = (index + 1) % props.items.length;
  else if (event.key === "ArrowUp") nextIndex = (index - 1 + props.items.length) % props.items.length;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = props.items.length - 1;

  if (nextIndex !== null) {
    event.preventDefault();
    document.getElementById(`${idBase}-header-${props.items[nextIndex].id}`)?.focus();
  }
}
</script>

<template>
  <div class="cp-accordion">
    <div v-for="(item, index) in items" :key="item.id" class="cp-accordion__item">
      <h3 class="cp-accordion__header">
        <button
          :id="`${idBase}-header-${item.id}`"
          type="button"
          :class="['cp-accordion__trigger', isOpen(item.id) && 'cp-accordion__trigger--open']"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="`${idBase}-panel-${item.id}`"
          :disabled="item.disabled"
          @click="toggle(item.id)"
          @keydown="onKeydown($event, index)"
        >
          <span class="cp-accordion__icon" aria-hidden="true" />
          {{ item.title }}
        </button>
      </h3>
      <div
        v-if="isOpen(item.id)"
        :id="`${idBase}-panel-${item.id}`"
        role="region"
        :aria-labelledby="`${idBase}-header-${item.id}`"
        class="cp-accordion__panel"
      >
        <slot :name="item.id" />
      </div>
    </div>
  </div>
</template>
