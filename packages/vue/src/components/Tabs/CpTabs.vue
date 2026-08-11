<script setup lang="ts">
import { computed, ref, useId } from "vue";
import type { CpTabItem } from "./types";

const props = defineProps<{ items: CpTabItem[]; modelValue?: string; ariaLabel?: string }>();
const emit = defineEmits<{ "update:modelValue": [id: string] }>();

const idBase = useId();
const internalValue = ref(
  props.modelValue ?? props.items.find((item) => !item.disabled)?.id ?? props.items[0]?.id
);
const activeValue = computed(() => props.modelValue ?? internalValue.value);

function selectTab(id: string) {
  internalValue.value = id;
  emit("update:modelValue", id);
}

function onKeydown(event: KeyboardEvent) {
  const enabled = props.items.filter((item) => !item.disabled);
  const currentIndex = enabled.findIndex((item) => item.id === activeValue.value);
  let nextIndex: number | null = null;

  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = enabled.length - 1;

  if (nextIndex !== null) {
    event.preventDefault();
    const next = enabled[nextIndex];
    selectTab(next.id);
    document.getElementById(`${idBase}-tab-${next.id}`)?.focus();
  }
}
</script>

<template>
  <div class="cp-tabs">
    <div role="tablist" :aria-label="ariaLabel" class="cp-tabs__list" @keydown="onKeydown">
      <button
        v-for="item in items"
        :id="`${idBase}-tab-${item.id}`"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="item.id === activeValue"
        :aria-controls="`${idBase}-panel-${item.id}`"
        :disabled="item.disabled"
        :tabindex="item.id === activeValue ? 0 : -1"
        :class="['cp-tabs__tab', item.id === activeValue && 'cp-tabs__tab--selected']"
        @click="selectTab(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      :id="`${idBase}-panel-${activeValue}`"
      role="tabpanel"
      :aria-labelledby="`${idBase}-tab-${activeValue}`"
      class="cp-tabs__panel"
      tabindex="0"
    >
      <slot :name="activeValue" />
    </div>
  </div>
</template>
