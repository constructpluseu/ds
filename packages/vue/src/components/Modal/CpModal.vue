<script setup lang="ts">
import { onBeforeUnmount, useId, useTemplateRef, watch } from "vue";
import type { CpModalProps } from "./types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const props = withDefaults(defineProps<CpModalProps>(), {
  size: "md",
  dismissOnBackdropClick: true,
});
const emit = defineEmits<{ close: [] }>();

const titleId = useId();
const dialogRef = useTemplateRef<HTMLDivElement>("dialogRef");
let previouslyFocused: HTMLElement | null = null;
let previousOverflow = "";

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    emit("close");
    return;
  }
  const dialog = dialogRef.value;
  if (event.key !== "Tab" || !dialog) return;

  const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openModal() {
  previouslyFocused = document.activeElement as HTMLElement | null;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKeyDown);
  requestAnimationFrame(() => {
    dialogRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
  });
}

function closeModal() {
  document.removeEventListener("keydown", onKeyDown);
  document.body.style.overflow = previousOverflow;
  previouslyFocused?.focus();
}

watch(
  () => props.open,
  (open) => {
    if (open) openModal();
    else closeModal();
  }
);

onBeforeUnmount(() => {
  if (props.open) closeModal();
});

function onBackdropMouseDown(event: MouseEvent) {
  if (props.dismissOnBackdropClick && event.target === event.currentTarget) {
    emit("close");
  }
}
</script>

<template>
  <div v-if="open" class="cp-modal-overlay" @mousedown="onBackdropMouseDown">
    <div
      ref="dialogRef"
      :class="['cp-modal', `cp-modal--${size}`]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
    >
      <div class="cp-modal__header">
        <h2 class="cp-modal__title" :id="titleId">{{ title }}</h2>
        <button type="button" class="cp-modal__close" aria-label="Fechar" @click="emit('close')">×</button>
      </div>
      <div class="cp-modal__body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="cp-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
