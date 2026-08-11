<script setup lang="ts">
withDefaults(
  defineProps<{ headers: string[]; rows: (string | number)[][]; ariaLabel?: string }>(),
  {}
);
</script>

<template>
  <table class="cp-structured-list" :aria-label="ariaLabel">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header" scope="col">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>
