<script setup lang="ts">
import { computed, useId } from "vue";
import type { CpTextInputProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CpTextInputProps>(), {
  size: "md",
  type: "text",
});
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const helperId = computed(() => `${inputId.value}-helper`);
const invalid = computed(() => Boolean(props.errorText));

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
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
    <input
      :id="inputId"
      v-bind="$attrs"
      :required="required"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :aria-invalid="invalid || undefined"
      :aria-describedby="errorText || helperText ? helperId : undefined"
      :class="['cp-input', `cp-input--${size}`, invalid && 'cp-input--invalid']"
      @input="onInput"
    />
    <span
      v-if="errorText || helperText"
      :id="helperId"
      :class="['cp-field__helper', errorText && 'cp-field__helper--error']"
    >
      {{ errorText || helperText }}
    </span>
  </div>
</template>
