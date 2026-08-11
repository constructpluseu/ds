<script setup lang="ts">
withDefaults(defineProps<{ ordered?: boolean; unstyled?: boolean; items: string[] }>(), {
  ordered: false,
  unstyled: false,
});
</script>

<template>
  <component :is="ordered ? 'ol' : 'ul'" :class="['cp-list', unstyled && 'cp-list--unstyled']">
    <li v-for="(item, index) in items" :key="index" class="cp-list__item">{{ item }}</li>
  </component>
</template>
