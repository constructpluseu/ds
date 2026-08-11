<script setup lang="ts">
import { ref, useId } from "vue";
import type { CpTooltipPlacement } from "./types";

withDefaults(defineProps<{ content: string; placement?: CpTooltipPlacement }>(), {
  placement: "top",
});

const id = useId();
const visible = ref(false);
</script>

<template>
  <span class="cp-tooltip-wrapper" @mouseenter="visible = true" @mouseleave="visible = false" @focusin="visible = true" @focusout="visible = false">
    <slot :described-by="id" />
    <span :id="id" role="tooltip" :class="['cp-tooltip', `cp-tooltip--${placement}`, visible && 'cp-tooltip--visible']">
      {{ content }}
    </span>
  </span>
</template>
