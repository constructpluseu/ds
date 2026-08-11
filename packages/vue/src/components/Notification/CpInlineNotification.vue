<script setup lang="ts">
import { computed } from "vue";
import type { CpNotificationStatus } from "./toast-store";

const props = withDefaults(
  defineProps<{ status?: CpNotificationStatus; title: string; description?: string; dismissible?: boolean }>(),
  { status: "info", dismissible: false }
);
const emit = defineEmits<{ close: [] }>();

const role = computed(() => (props.status === "danger" ? "alert" : "status"));
</script>

<template>
  <div :class="['cp-notification', `cp-notification--${status}`]" :role="role">
    <span class="cp-notification__icon" aria-hidden="true" />
    <div class="cp-notification__content">
      <p class="cp-notification__title">{{ title }}</p>
      <p v-if="description" class="cp-notification__description">{{ description }}</p>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="cp-notification__close"
      aria-label="Fechar notificação"
      @click="emit('close')"
    >
      ×
    </button>
  </div>
</template>
