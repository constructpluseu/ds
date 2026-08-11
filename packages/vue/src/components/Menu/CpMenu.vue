<script setup lang="ts">
import { onBeforeUnmount, ref, useId, watch } from "vue";
import type { CpMenuItem } from "./types";

const props = withDefaults(defineProps<{ items: CpMenuItem[]; ariaLabel?: string }>(), {
  ariaLabel: "Menu de ações",
});

const open = ref(false);
const id = useId();
const wrapperRef = ref<HTMLElement | null>(null);
const itemRefs = ref<Record<string, HTMLButtonElement | null>>({});

function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}
function select(item: CpMenuItem) {
  item.onSelect();
  close();
}
function onDocumentClick(event: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    close();
  }
}
function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    return;
  }
  const enabled = props.items.filter((item) => !item.disabled);
  const focusedIndex = enabled.findIndex(
    (item) => itemRefs.value[item.id] === document.activeElement
  );
  let nextIndex: number | null = null;
  if (event.key === "ArrowDown") nextIndex = (focusedIndex + 1) % enabled.length;
  else if (event.key === "ArrowUp") nextIndex = (focusedIndex - 1 + enabled.length) % enabled.length;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = enabled.length - 1;

  if (nextIndex !== null) {
    event.preventDefault();
    itemRefs.value[enabled[nextIndex].id]?.focus();
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener("mousedown", onDocumentClick);
  } else {
    document.removeEventListener("mousedown", onDocumentClick);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onDocumentClick);
});
</script>

<template>
  <div ref="wrapperRef" class="cp-menu-wrapper">
    <slot name="trigger" :toggle="toggle" :open="open" :id="id" />
    <div
      v-if="open"
      :id="id"
      role="menu"
      :aria-label="ariaLabel"
      class="cp-menu__panel"
      @keydown="onMenuKeydown"
    >
      <button
        v-for="item in items"
        :key="item.id"
        :ref="(el) => (itemRefs[item.id] = el as HTMLButtonElement)"
        type="button"
        role="menuitem"
        :disabled="item.disabled"
        :class="['cp-menu__item', item.danger && 'cp-menu__item--danger']"
        @click="select(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
