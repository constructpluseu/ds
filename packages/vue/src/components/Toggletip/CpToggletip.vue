<script setup lang="ts">
import { onBeforeUnmount, ref, useId, watch } from "vue";

withDefaults(defineProps<{ ariaLabel?: string }>(), { ariaLabel: "Mais informação" });

const open = ref(false);
const id = useId();
const wrapperRef = ref<HTMLElement | null>(null);

function close() {
  open.value = false;
}
function onDocumentClick(event: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    close();
  }
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") close();
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
</script>

<template>
  <span ref="wrapperRef" class="cp-toggletip-wrapper">
    <button
      type="button"
      class="cp-toggletip__trigger"
      :aria-expanded="open"
      :aria-controls="id"
      :aria-label="ariaLabel"
      @click="open = !open"
    >
      ?
    </button>
    <span v-if="open" :id="id" role="status" class="cp-toggletip__panel">
      <slot />
    </span>
  </span>
</template>
