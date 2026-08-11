<script setup lang="ts">
import { computed, useId } from "vue";
import type { CpProgressBarProps } from "./types";

const props = withDefaults(defineProps<CpProgressBarProps>(), {
  value: 0,
  max: 100,
  showValue: false,
  indeterminate: false,
  status: "default",
});

const id = useId();
const percent = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)));
const trackClasses = computed(() =>
  [
    "cp-progress-bar__track",
    props.status === "danger" && "cp-progress-bar--danger",
    props.indeterminate && "cp-progress-bar--indeterminate",
  ].filter(Boolean)
);
</script>

<template>
  <div class="cp-progress-bar">
    <div v-if="label || showValue" class="cp-progress-bar__header">
      <span v-if="label" class="cp-progress-bar__label" :id="id">{{ label }}</span>
      <span v-if="showValue && !indeterminate">{{ Math.round(percent) }}%</span>
    </div>
    <div
      :class="trackClasses"
      role="progressbar"
      :aria-labelledby="label ? id : undefined"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div class="cp-progress-bar__fill" :style="indeterminate ? undefined : { width: `${percent}%` }" />
    </div>
  </div>
</template>
