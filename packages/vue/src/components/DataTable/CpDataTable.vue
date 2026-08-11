<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import type { DataTableColumn, DataTableRow, SortDirection } from "./types";

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[];
    rows: DataTableRow[];
    rowKey?: (row: DataTableRow) => string;
    caption?: string;
    sortKey?: string | null;
    sortDirection?: SortDirection;
    selectable?: boolean;
    selectedKeys?: string[];
    emptyMessage?: string;
  }>(),
  {
    rowKey: (row: DataTableRow) => String(row.id ?? ""),
    sortKey: null,
    sortDirection: null,
    selectable: false,
    selectedKeys: () => [],
    emptyMessage: "Sem dados para mostrar.",
  }
);
const emit = defineEmits<{
  sortChange: [key: string, direction: SortDirection];
  selectionChange: [keys: string[]];
}>();

const selectedSet = computed(() => new Set(props.selectedKeys));
const allKeys = computed(() => props.rows.map(props.rowKey));
const allSelected = computed(
  () => allKeys.value.length > 0 && allKeys.value.every((key) => selectedSet.value.has(key))
);
const someSelected = computed(
  () => !allSelected.value && allKeys.value.some((key) => selectedSet.value.has(key))
);
const selectAllRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (selectAllRef.value) selectAllRef.value.indeterminate = someSelected.value;
});

function nextDirection(column: DataTableColumn): SortDirection {
  if (props.sortKey !== column.key) return "asc";
  if (props.sortDirection === "asc") return "desc";
  if (props.sortDirection === "desc") return null;
  return "asc";
}

function onHeaderClick(column: DataTableColumn) {
  if (!column.sortable) return;
  emit("sortChange", column.key, nextDirection(column));
}

function ariaSort(column: DataTableColumn): "ascending" | "descending" | undefined {
  if (props.sortKey !== column.key || props.sortDirection === null) return undefined;
  return props.sortDirection === "asc" ? "ascending" : "descending";
}

function isSorted(column: DataTableColumn): boolean {
  return props.sortKey === column.key && props.sortDirection !== null;
}

function toggleAll() {
  emit("selectionChange", allSelected.value ? [] : allKeys.value);
}

function toggleRow(key: string) {
  emit(
    "selectionChange",
    selectedSet.value.has(key) ? props.selectedKeys.filter((k) => k !== key) : [...props.selectedKeys, key]
  );
}
</script>

<template>
  <div class="cp-data-table">
    <table class="cp-data-table__table">
      <caption v-if="caption" class="cp-visually-hidden">{{ caption }}</caption>
      <thead>
        <tr>
          <th v-if="selectable" scope="col" class="cp-data-table__checkbox-cell">
            <label class="cp-checkbox">
              <input
                ref="selectAllRef"
                type="checkbox"
                class="cp-checkbox__input"
                :checked="allSelected"
                aria-label="Selecionar todas as linhas"
                @change="toggleAll"
              />
              <span class="cp-checkbox__box" aria-hidden="true"></span>
            </label>
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :aria-sort="ariaSort(column)"
            :class="['cp-data-table__header-cell', column.align === 'end' && 'cp-data-table__header-cell--end']"
          >
            <button v-if="column.sortable" type="button" class="cp-data-table__sort-button" @click="onHeaderClick(column)">
              {{ column.header }}
              <span
                :class="['cp-data-table__sort-icon', isSorted(column) && 'cp-data-table__sort-icon--active']"
                aria-hidden="true"
              >
                {{ sortKey === column.key && sortDirection === "desc" ? "▼" : "▲" }}
              </span>
            </button>
            <template v-else>{{ column.header }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0">
          <td class="cp-data-table__empty" :colspan="columns.length + (selectable ? 1 : 0)">
            {{ emptyMessage }}
          </td>
        </tr>
        <tr
          v-for="row in rows"
          :key="rowKey(row)"
          :class="['cp-data-table__row', selectedSet.has(rowKey(row)) && 'cp-data-table__row--selected']"
        >
          <td v-if="selectable" class="cp-data-table__checkbox-cell">
            <label class="cp-checkbox">
              <input
                type="checkbox"
                class="cp-checkbox__input"
                :checked="selectedSet.has(rowKey(row))"
                :aria-label="`Selecionar linha ${rowKey(row)}`"
                @change="toggleRow(rowKey(row))"
              />
              <span class="cp-checkbox__box" aria-hidden="true"></span>
            </label>
          </td>
          <td
            v-for="column in columns"
            :key="column.key"
            :class="['cp-data-table__cell', column.align === 'end' && 'cp-data-table__cell--end']"
          >
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
