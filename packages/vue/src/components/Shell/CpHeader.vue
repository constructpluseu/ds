<script setup lang="ts">
withDefaults(
  defineProps<{
    brand: string;
    brandHref?: string;
    menuButton?: boolean;
    navOpen?: boolean;
  }>(),
  { brandHref: "#", menuButton: false, navOpen: false }
);
const emit = defineEmits<{ menuToggle: [] }>();
</script>

<template>
  <header class="cp-header">
    <button
      v-if="menuButton"
      type="button"
      class="cp-header__menu-button"
      :aria-label="navOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
      :aria-expanded="navOpen"
      @click="emit('menuToggle')"
    >
      <span aria-hidden="true">{{ navOpen ? "✕" : "☰" }}</span>
    </button>
    <a class="cp-header__brand" :href="brandHref">{{ brand }}</a>
    <div class="cp-header__actions">
      <slot />
    </div>
  </header>
</template>
