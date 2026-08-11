<script setup lang="ts">
import type { CpTagStatus } from "./types";

withDefaults(defineProps<{ status?: CpTagStatus; removable?: boolean }>(), {
  status: "neutral",
  removable: false,
});
const emit = defineEmits<{ remove: [] }>();
</script>

<template>
  <span :class="['cp-tag', `cp-tag--${status}`]">
    <slot />
    <button v-if="removable" type="button" class="cp-tag__remove" aria-label="Remover" @click="emit('remove')">
      ×
    </button>
  </span>
</template>
