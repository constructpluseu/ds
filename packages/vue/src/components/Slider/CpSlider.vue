<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    showValue?: boolean;
  }>(),
  { modelValue: 0, min: 0, max: 100, step: 1, showValue: true }
);
const emit = defineEmits<{ "update:modelValue": [value: number] }>();

const generatedId = useId();

function onInput(event: Event) {
  emit("update:modelValue", Number((event.target as HTMLInputElement).value));
}
</script>

<template>
  <div class="cp-field">
    <div v-if="label || showValue" class="cp-progress-bar__header">
      <label v-if="label" :for="generatedId" class="cp-field__label">{{ label }}</label>
      <span v-if="showValue" class="cp-slider-field__value">{{ modelValue }}</span>
    </div>
    <input
      :id="generatedId"
      type="range"
      class="cp-slider"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>
