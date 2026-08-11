<script setup lang="ts">
import { computed } from "vue";
import type { CpAvatarSize, CpAvatarStatus } from "./types";

const props = withDefaults(
  defineProps<{ name: string; src?: string; size?: CpAvatarSize; status?: CpAvatarStatus }>(),
  { size: "md", status: "none" }
);

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
});
</script>

<template>
  <span :class="['cp-avatar', `cp-avatar--${size}`]" role="img" :aria-label="name">
    <img v-if="src" class="cp-avatar__image" :src="src" alt="" />
    <span v-else aria-hidden="true">{{ initials }}</span>
    <span v-if="status !== 'none'" :class="['cp-avatar__status', `cp-avatar__status--${status}`]" aria-hidden="true" />
  </span>
</template>
