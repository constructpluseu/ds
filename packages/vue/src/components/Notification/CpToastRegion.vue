<script setup lang="ts">
import { dismissToast, toastState } from "./toast-store";
</script>

<template>
  <div class="cp-toast-region" aria-live="polite" aria-atomic="true">
    <div
      v-for="toast in toastState.items"
      :key="toast.id"
      :class="['cp-toast', `cp-toast--${toast.status}`]"
      :role="toast.status === 'danger' ? 'alert' : 'status'"
    >
      <div class="cp-notification__content">
        <p class="cp-notification__title">{{ toast.title }}</p>
        <p v-if="toast.description" class="cp-notification__description">{{ toast.description }}</p>
      </div>
      <button
        type="button"
        class="cp-notification__close"
        aria-label="Fechar notificação"
        @click="dismissToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>
