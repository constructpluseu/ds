<script setup lang="ts">
import { useId, useTemplateRef, watchEffect } from "vue";
import type { CpCheckboxProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CpCheckboxProps>(), {
  indeterminate: false,
});
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const generatedId = useId();
const inputId = props.id ?? generatedId;
const inputRef = useTemplateRef<HTMLInputElement>("inputRef");

watchEffect(
  () => {
    if (inputRef.value) {
      inputRef.value.indeterminate = props.indeterminate;
    }
  },
  { flush: "post" }
);

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <label :for="inputId" :class="['cp-checkbox', disabled && 'cp-checkbox--disabled']">
    <input
      ref="inputRef"
      :id="inputId"
      v-bind="$attrs"
      type="checkbox"
      class="cp-checkbox__input"
      :disabled="disabled"
      :checked="modelValue"
      @change="onChange"
    />
    <span class="cp-checkbox__box" aria-hidden="true" />
    <span class="cp-checkbox__label">{{ label }}</span>
  </label>
</template>
