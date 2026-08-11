<script setup lang="ts">
withDefaults(defineProps<{ size?: "sm" | "md" | "lg"; label?: string }>(), {
  size: "md",
  label: "A carregar…",
});
</script>

<template>
  <span :class="['cp-spinner', `cp-spinner--${size}`]" role="status" :aria-label="label" />
</template>
