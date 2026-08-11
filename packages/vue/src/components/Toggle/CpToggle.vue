<script setup lang="ts">
import { useId } from "vue";
import type { CpToggleProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<CpToggleProps>();
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const generatedId = useId();
const inputId = props.id ?? generatedId;

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <label :for="inputId" :class="['cp-toggle', disabled && 'cp-toggle--disabled']">
    <input
      :id="inputId"
      v-bind="$attrs"
      type="checkbox"
      role="switch"
      class="cp-toggle__input"
      :disabled="disabled"
      :checked="modelValue"
      @change="onChange"
    />
    <span class="cp-toggle__track" aria-hidden="true">
      <span class="cp-toggle__thumb" />
    </span>
    <span>{{ label }}</span>
  </label>
</template>
