<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ page: number; totalPages: number; ariaLabel?: string }>(),
  { ariaLabel: "Paginação" }
);
const emit = defineEmits<{ "update:page": [page: number] }>();

const canGoPrevious = computed(() => props.page > 1);
const canGoNext = computed(() => props.page < props.totalPages);
</script>

<template>
  <nav class="cp-pagination" :aria-label="ariaLabel">
    <span class="cp-pagination__status">Página {{ page }} de {{ totalPages }}</span>
    <div class="cp-pagination__nav">
      <button
        type="button"
        class="cp-pagination__button"
        :disabled="!canGoPrevious"
        aria-label="Página anterior"
        @click="emit('update:page', page - 1)"
      >
        ‹
      </button>
      <button
        type="button"
        class="cp-pagination__button"
        :disabled="!canGoNext"
        aria-label="Página seguinte"
        @click="emit('update:page', page + 1)"
      >
        ›
      </button>
    </div>
  </nav>
</template>
