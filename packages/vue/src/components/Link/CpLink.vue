<script setup lang="ts">
withDefaults(
  defineProps<{ href?: string; muted?: boolean; disabled?: boolean; external?: boolean }>(),
  { muted: false, disabled: false, external: false }
);
</script>

<template>
  <a
    :href="href"
    :class="['cp-link', muted && 'cp-link--muted']"
    :aria-disabled="disabled || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="external" class="cp-link__external-icon" aria-hidden="true" />
  </a>
</template>
