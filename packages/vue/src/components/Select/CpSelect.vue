<script setup lang="ts">
import { computed, useId } from "vue";
import type { CpSelectProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CpSelectProps>(), {
  size: "md",
});
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const helperId = computed(() => `${inputId.value}-helper`);
const invalid = computed(() => Boolean(props.errorText));

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
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
    <select
      :id="inputId"
      v-bind="$attrs"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      :aria-invalid="invalid || undefined"
      :aria-describedby="errorText || helperText ? helperId : undefined"
      :class="['cp-input', `cp-input--${size}`, invalid && 'cp-input--invalid']"
      @change="onChange"
    >
      <option v-if="placeholder" value="" disabled hidden>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>
    <span
      v-if="errorText || helperText"
      :id="helperId"
      :class="['cp-field__helper', errorText && 'cp-field__helper--error']"
    >
      {{ errorText || helperText }}
    </span>
  </div>
</template>
