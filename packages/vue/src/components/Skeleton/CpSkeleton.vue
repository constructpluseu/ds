<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "text" | "circle" | "rect";
    width?: string | number;
    height?: string | number;
  }>(),
  { variant: "text" }
);

const inlineStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));
</script>

<template>
  <span
    :class="['cp-skeleton', `cp-skeleton--${variant}`]"
    :style="inlineStyle"
    role="presentation"
    aria-hidden="true"
  />
</template>
