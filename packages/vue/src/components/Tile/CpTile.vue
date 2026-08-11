<script setup lang="ts">
withDefaults(defineProps<{ title: string; description?: string; href?: string }>(), {});
</script>

<template>
  <a v-if="href" :href="href" class="cp-tile">
    <span v-if="$slots.icon" class="cp-tile__icon" aria-hidden="true"><slot name="icon" /></span>
    <span class="cp-tile__title">{{ title }}</span>
    <span v-if="description" class="cp-tile__description">{{ description }}</span>
  </a>
  <button v-else type="button" class="cp-tile">
    <span v-if="$slots.icon" class="cp-tile__icon" aria-hidden="true"><slot name="icon" /></span>
    <span class="cp-tile__title">{{ title }}</span>
    <span v-if="description" class="cp-tile__description">{{ description }}</span>
  </button>
</template>
