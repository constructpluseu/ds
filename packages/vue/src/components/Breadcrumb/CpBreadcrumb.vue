<script setup lang="ts">
import type { CpBreadcrumbItem } from "./types";

withDefaults(defineProps<{ items: CpBreadcrumbItem[]; ariaLabel?: string }>(), {
  ariaLabel: "Navegação estrutural",
});
</script>

<template>
  <nav :aria-label="ariaLabel">
    <ol class="cp-breadcrumb__list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="cp-breadcrumb__item">
        <span
          v-if="index === items.length - 1 || !item.href"
          class="cp-breadcrumb__current"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <a v-else class="cp-breadcrumb__link" :href="item.href">{{ item.label }}</a>
        <span v-if="index !== items.length - 1" class="cp-breadcrumb__separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>
