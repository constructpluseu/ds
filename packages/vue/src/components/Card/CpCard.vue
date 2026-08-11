<script setup lang="ts">
withDefaults(defineProps<{ title?: string; subtitle?: string; interactive?: boolean }>(), {
  interactive: false,
});
</script>

<template>
  <div :class="['cp-card', interactive && 'cp-card--interactive']">
    <div v-if="title || subtitle || $slots.headerAction" class="cp-card__header">
      <div>
        <h3 v-if="title" class="cp-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="cp-card__subtitle">{{ subtitle }}</p>
      </div>
      <slot name="headerAction" />
    </div>
    <div class="cp-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="cp-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
