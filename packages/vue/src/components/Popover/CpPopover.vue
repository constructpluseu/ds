<script setup lang="ts">
import { onBeforeUnmount, ref, useId, watch } from "vue";

withDefaults(defineProps<{ placement?: "left" | "right" }>(), { placement: "left" });

const open = ref(false);
const id = useId();
const wrapperRef = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}
function onDocumentClick(event: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    close();
  }
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    close();
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKeydown);
  } else {
    document.removeEventListener("mousedown", onDocumentClick);
    document.removeEventListener("keydown", onKeydown);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});

defineExpose({ open, toggle, close });
</script>

<template>
  <div ref="wrapperRef" class="cp-popover-wrapper">
    <slot name="trigger" :toggle="toggle" :open="open" :id="id" />
    <div
      v-if="open"
      :id="id"
      role="dialog"
      :class="['cp-popover__panel', placement === 'right' && 'cp-popover__panel--right']"
    >
      <slot />
    </div>
  </div>
</template>
