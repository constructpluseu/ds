<script setup lang="ts">
import { computed, useId } from "vue";
import type { CpFieldSize } from "../TextInput/types";

const props = withDefaults(
  defineProps<{
    label?: string;
    helperText?: string;
    errorText?: string;
    size?: CpFieldSize;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
  }>(),
  { size: "md", modelValue: 0, step: 1 }
);
const emit = defineEmits<{ "update:modelValue": [value: number] }>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const helperId = computed(() => `${inputId.value}-helper`);
const invalid = computed(() => Boolean(props.errorText));
const canDecrement = computed(() => props.min === undefined || props.modelValue > props.min);
const canIncrement = computed(() => props.max === undefined || props.modelValue < props.max);

function clamp(next: number): number {
  let result = next;
  if (props.min !== undefined) result = Math.max(props.min, result);
  if (props.max !== undefined) result = Math.min(props.max, result);
  return result;
}

function onInput(event: Event) {
  emit("update:modelValue", clamp(Number((event.target as HTMLInputElement).value)));
}
</script>

<template>
  <div class="cp-field">
    <label
      v-if="label"
      :for="inputId"
      :class="['cp-field__label', required && 'cp-field__label--required']"
    >
      {{ label }}
    </label>
    <div :class="['cp-number-input', invalid && 'cp-number-input--invalid']">
      <button
        type="button"
        class="cp-number-input__step"
        aria-label="Diminuir"
        :disabled="disabled || !canDecrement"
        @click="emit('update:modelValue', clamp(modelValue - step))"
      >
        −
      </button>
      <input
        :id="inputId"
        type="number"
        :required="required"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :aria-invalid="invalid || undefined"
        :aria-describedby="errorText || helperText ? helperId : undefined"
        :class="['cp-input', 'cp-number-input__field', `cp-input--${size}`]"
        @input="onInput"
      />
      <button
        type="button"
        class="cp-number-input__step"
        aria-label="Aumentar"
        :disabled="disabled || !canIncrement"
        @click="emit('update:modelValue', clamp(modelValue + step))"
      >
        +
      </button>
    </div>
    <span
      v-if="errorText || helperText"
      :id="helperId"
      :class="['cp-field__helper', errorText && 'cp-field__helper--error']"
    >
      {{ errorText || helperText }}
    </span>
  </div>
</template>
