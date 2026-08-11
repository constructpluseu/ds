<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import {
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  formatDisplayDate,
  formatFullDate,
  formatMonthLabel,
  getMonthMatrix,
  isSameDay,
  parseISODate,
  toISODate,
} from "./dateUtils";

const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: string | null;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
  }>(),
  { placeholder: "dd/mm/aaaa", modelValue: null, disabled: false }
);
const emit = defineEmits<{ "update:modelValue": [value: string | null] }>();

const id = useId();
const panelId = `${id}-panel`;
const helperId = `${id}-helper`;

const open = ref(false);
const selectedDate = computed(() => parseISODate(props.modelValue));
const min = computed(() => parseISODate(props.minDate));
const max = computed(() => parseISODate(props.maxDate));
const viewDate = ref(selectedDate.value ?? new Date());
const activeDate = ref(selectedDate.value ?? new Date());
const invalid = computed(() => Boolean(props.errorText));

const wrapperRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const dayRefs = new Map<string, HTMLButtonElement>();

function setDayRef(key: string, el: unknown) {
  if (el) dayRefs.set(key, el as HTMLButtonElement);
  else dayRefs.delete(key);
}

const weeks = computed(() => getMonthMatrix(viewDate.value));

function isDisabledDate(date: Date) {
  if (min.value && date < min.value) return true;
  if (max.value && date > max.value) return true;
  return false;
}

function selectDate(date: Date) {
  if (isDisabledDate(date)) return;
  emit("update:modelValue", toISODate(date));
  open.value = false;
  inputRef.value?.focus();
}

function openPanel() {
  if (props.disabled) return;
  const base = selectedDate.value ?? new Date();
  viewDate.value = base;
  activeDate.value = base;
  open.value = true;
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
    event.preventDefault();
    openPanel();
  }
}

function onDayKeydown(event: KeyboardEvent) {
  const deltas: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -7,
    ArrowDown: 7,
  };
  if (event.key in deltas) {
    event.preventDefault();
    const next = addDays(activeDate.value, deltas[event.key]);
    activeDate.value = next;
    if (next.getMonth() !== viewDate.value.getMonth() || next.getFullYear() !== viewDate.value.getFullYear()) {
      viewDate.value = next;
    }
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectDate(activeDate.value);
  } else if (event.key === "Escape") {
    open.value = false;
    inputRef.value?.focus();
  }
}

function onDocumentClick(event: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    open.value = false;
  }
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener("mousedown", onDocumentClick);
  else document.removeEventListener("mousedown", onDocumentClick);
});

watch([open, activeDate], async () => {
  if (!open.value) return;
  await nextTick();
  dayRefs.get(toISODate(activeDate.value))?.focus();
});

onBeforeUnmount(() => document.removeEventListener("mousedown", onDocumentClick));
</script>

<template>
  <div class="cp-field">
    <label v-if="label" :for="id" class="cp-field__label">{{ label }}</label>
    <div ref="wrapperRef" class="cp-date-picker">
      <input
        :id="id"
        ref="inputRef"
        type="text"
        readonly
        role="combobox"
        :disabled="disabled"
        :class="['cp-input', 'cp-input--md', 'cp-date-picker__input', invalid && 'cp-input--invalid']"
        :placeholder="placeholder"
        :value="selectedDate ? formatDisplayDate(selectedDate) : ''"
        aria-haspopup="dialog"
        :aria-expanded="open"
        :aria-controls="panelId"
        :aria-describedby="errorText || helperText ? helperId : undefined"
        :aria-invalid="invalid || undefined"
        @click="openPanel"
        @keydown="onInputKeydown"
      />
      <div v-if="open" :id="panelId" role="dialog" aria-label="Escolher data" class="cp-date-picker__panel">
        <div class="cp-date-picker__header">
          <button type="button" class="cp-date-picker__nav" aria-label="Mês anterior" @click="viewDate = addMonths(viewDate, -1)">‹</button>
          <span class="cp-date-picker__month-label">{{ formatMonthLabel(viewDate) }}</span>
          <button type="button" class="cp-date-picker__nav" aria-label="Mês seguinte" @click="viewDate = addMonths(viewDate, 1)">›</button>
        </div>
        <div class="cp-date-picker__grid">
          <span v-for="weekday in WEEKDAY_LABELS" :key="weekday" class="cp-date-picker__weekday">{{ weekday }}</span>
          <button
            v-for="date in weeks"
            :key="toISODate(date)"
            type="button"
            :ref="(el) => setDayRef(toISODate(date), el)"
            :disabled="isDisabledDate(date)"
            :tabindex="isSameDay(date, activeDate) ? 0 : -1"
            :aria-pressed="selectedDate ? isSameDay(date, selectedDate) : false"
            :aria-current="isSameDay(date, new Date()) ? 'date' : undefined"
            :aria-label="formatFullDate(date)"
            :class="[
              'cp-date-picker__day',
              date.getMonth() !== viewDate.getMonth() && 'cp-date-picker__day--outside',
              isSameDay(date, new Date()) && 'cp-date-picker__day--today',
              selectedDate && isSameDay(date, selectedDate) && 'cp-date-picker__day--selected',
              isSameDay(date, activeDate) && 'cp-date-picker__day--active',
            ]"
            @click="selectDate(date)"
            @keydown="onDayKeydown"
          >
            {{ date.getDate() }}
          </button>
        </div>
      </div>
    </div>
    <span v-if="errorText || helperText" :id="helperId" :class="['cp-field__helper', errorText && 'cp-field__helper--error']">
      {{ errorText || helperText }}
    </span>
  </div>
</template>
