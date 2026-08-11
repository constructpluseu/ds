<script setup lang="ts">
import { computed } from "vue";
import type { CpButtonProps } from "./types";

const props = withDefaults(defineProps<CpButtonProps>(), {
  variant: "primary",
  size: "md",
  loading: false,
  fullWidth: false,
  disabled: false,
  type: "button",
});

const classes = computed(() =>
  [
    "cp-button",
    `cp-button--${props.variant}`,
    `cp-button--${props.size}`,
    props.loading && "cp-button--loading",
    props.fullWidth && "cp-button--full-width",
  ].filter(Boolean)
);
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="cp-button__spinner" aria-hidden="true" />
    <slot v-if="!loading" name="leading-icon" />
    <span><slot /></span>
    <slot v-if="!loading" name="trailing-icon" />
  </button>
</template>
