<script setup lang="ts">
import { useId } from "vue";
import type { CpRadioButtonProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<CpRadioButtonProps>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const generatedId = useId();
const inputId = props.id ?? generatedId;

function onChange() {
  if (props.value !== undefined) {
    emit("update:modelValue", props.value);
  }
}
</script>

<template>
  <label :for="inputId" :class="['cp-radio', disabled && 'cp-radio--disabled']">
    <input
      :id="inputId"
      v-bind="$attrs"
      type="radio"
      class="cp-radio__input"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="modelValue === value"
      @change="onChange"
    />
    <span class="cp-radio__circle" aria-hidden="true" />
    <span class="cp-radio__label">{{ label }}</span>
  </label>
</template>
