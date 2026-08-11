<script setup lang="ts">
import { computed, useId } from "vue";
import type { CpFieldSize } from "../TextInput/types";

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: CpFieldSize;
    modelValue?: string;
    clearable?: boolean;
  }>(),
  { label: "Pesquisar", size: "md", modelValue: "", clearable: false }
);
const emit = defineEmits<{ "update:modelValue": [value: string]; clear: [] }>();

const generatedId = useId();
const inputId = computed(() => generatedId);
const showClear = computed(() => props.clearable && Boolean(props.modelValue));

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
function onClear() {
  emit("update:modelValue", "");
  emit("clear");
}
</script>

<template>
  <div class="cp-search">
    <span class="cp-search__icon" aria-hidden="true" />
    <label :for="inputId" class="cp-visually-hidden">{{ label }}</label>
    <input
      :id="inputId"
      type="search"
      role="searchbox"
      :placeholder="label"
      :value="modelValue"
      :class="['cp-input', 'cp-search__field', showClear && 'cp-search__field--clearable', `cp-input--${size}`]"
      @input="onInput"
    />
    <button v-if="showClear" type="button" class="cp-search__clear" aria-label="Limpar pesquisa" @click="onClear">
      ×
    </button>
  </div>
</template>
