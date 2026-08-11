<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from "vue";
import type { CpComboboxOption } from "./types";

const props = withDefaults(
  defineProps<{
    label?: string;
    options: CpComboboxOption[];
    modelValue: string[];
    multiple?: boolean;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
  }>(),
  { multiple: false, placeholder: "Selecione…", modelValue: () => [] }
);
const emit = defineEmits<{ "update:modelValue": [value: string[]] }>();

const open = ref(false);
const query = ref("");
const activeIndex = ref(0);
const id = useId();
const listboxId = `${id}-listbox`;
const helperId = `${id}-helper`;
const wrapperRef = ref<HTMLElement | null>(null);

const invalid = computed(() => Boolean(props.errorText));
const filtered = computed(() =>
  props.options.filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase()))
);
const selectedOptions = computed(() =>
  props.options.filter((option) => props.modelValue.includes(option.value))
);
const displayValue = computed(() =>
  open.value || props.multiple ? query.value : selectedOptions.value[0]?.label ?? ""
);

function toggleValue(optionValue: string) {
  if (props.multiple) {
    const next = props.modelValue.includes(optionValue)
      ? props.modelValue.filter((v) => v !== optionValue)
      : [...props.modelValue, optionValue];
    emit("update:modelValue", next);
    query.value = "";
  } else {
    emit("update:modelValue", [optionValue]);
    open.value = false;
    query.value = "";
  }
}

function onInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
  open.value = true;
  activeIndex.value = 0;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (!open.value) {
      open.value = true;
      return;
    }
    activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
  } else if (event.key === "Enter") {
    event.preventDefault();
    const option = filtered.value[activeIndex.value];
    if (option && !option.disabled) toggleValue(option.value);
  } else if (event.key === "Escape") {
    open.value = false;
  }
}

function onDocumentClick(event: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    open.value = false;
    query.value = "";
  }
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener("mousedown", onDocumentClick);
  else document.removeEventListener("mousedown", onDocumentClick);
});
onBeforeUnmount(() => document.removeEventListener("mousedown", onDocumentClick));
</script>

<template>
  <div class="cp-field">
    <label v-if="label" :for="id" class="cp-field__label">{{ label }}</label>
    <div ref="wrapperRef" class="cp-combobox">
      <div v-if="multiple && selectedOptions.length > 0" class="cp-combobox__tags">
        <span v-for="option in selectedOptions" :key="option.value" class="cp-tag cp-tag--info">
          {{ option.label }}
          <button
            type="button"
            class="cp-tag__remove"
            :aria-label="`Remover ${option.label}`"
            @click="toggleValue(option.value)"
          >
            ×
          </button>
        </span>
      </div>
      <input
        :id="id"
        role="combobox"
        :aria-expanded="open"
        :aria-controls="listboxId"
        aria-autocomplete="list"
        :aria-invalid="invalid || undefined"
        :aria-describedby="errorText || helperText ? helperId : undefined"
        :class="['cp-input', 'cp-input--md', 'cp-combobox__input', invalid && 'cp-input--invalid']"
        :placeholder="placeholder"
        :value="displayValue"
        autocomplete="off"
        @input="onInput"
        @focus="open = true"
        @keydown="onKeydown"
      />
      <ul v-if="open" :id="listboxId" role="listbox" class="cp-combobox__listbox" :aria-multiselectable="multiple || undefined">
        <li v-if="filtered.length === 0" class="cp-combobox__empty">Sem resultados</li>
        <li
          v-for="(option, index) in filtered"
          :key="option.value"
          role="option"
          :aria-selected="modelValue.includes(option.value)"
          :aria-disabled="option.disabled"
          :class="['cp-combobox__option', index === activeIndex && 'cp-combobox__option--active', modelValue.includes(option.value) && 'cp-combobox__option--selected']"
          @mousedown.prevent="!option.disabled && toggleValue(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <span v-if="errorText || helperText" :id="helperId" :class="['cp-field__helper', errorText && 'cp-field__helper--error']">
      {{ errorText || helperText }}
    </span>
  </div>
</template>
