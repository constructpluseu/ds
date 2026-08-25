<script setup lang="ts">
import type { SideNavItem, SideNavLeafItem } from "./types";

const props = withDefaults(
  defineProps<{
    label?: string;
    items: SideNavItem[];
    activeId?: string | null;
    expandedIds: string[];
    open?: boolean;
  }>(),
  { label: "Navegação principal", activeId: null, open: true }
);
const emit = defineEmits<{
  expandedChange: [ids: string[]];
  /**
   * Emitido ao clicar num item folha, antes da navegação do browser. Chamar
   * `event.preventDefault()` cancela o `href` (ex.: router client-side,
   * verificação de permissão antes de navegar).
   */
  navigate: [item: SideNavLeafItem, event: MouseEvent];
}>();

function toggleExpand(id: string) {
  const next = new Set(props.expandedIds);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  emit("expandedChange", Array.from(next));
}

function handleNavigate(item: SideNavLeafItem, event: MouseEvent) {
  emit("navigate", item, event);
}
</script>

<template>
  <nav :class="['cp-side-nav', !open && 'cp-side-nav--closed']" :aria-label="label">
    <ul class="cp-side-nav__list">
      <li v-for="item in items" :key="item.id">
        <a
          v-if="!item.children || item.children.length === 0"
          :href="item.href"
          class="cp-side-nav__link"
          :aria-current="activeId === item.id ? 'page' : undefined"
          @click="handleNavigate(item, $event)"
        >
          {{ item.label }}
        </a>
        <template v-else>
          <button
            type="button"
            class="cp-side-nav__toggle"
            :aria-expanded="expandedIds.includes(item.id)"
            @click="toggleExpand(item.id)"
          >
            <span class="cp-side-nav__toggle-label">{{ item.label }}</span>
            <span class="cp-side-nav__toggle-icon" aria-hidden="true">
              {{ expandedIds.includes(item.id) ? "▾" : "▸" }}
            </span>
          </button>
          <ul v-if="expandedIds.includes(item.id)" class="cp-side-nav__sublist">
            <li v-for="child in item.children" :key="child.id">
              <a
                :href="child.href"
                class="cp-side-nav__link"
                :aria-current="activeId === child.id ? 'page' : undefined"
                @click="handleNavigate(child, $event)"
              >
                {{ child.label }}
              </a>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </nav>
</template>
