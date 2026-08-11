<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: File[];
    accept?: string;
    multiple?: boolean;
    maxSizeBytes?: number;
    helperText?: string;
    errorText?: string;
    disabled?: boolean;
  }>(),
  { multiple: false, disabled: false, modelValue: () => [] }
);
const emit = defineEmits<{ "update:modelValue": [value: File[]] }>();

const dragging = ref(false);

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isOversize(file: File): boolean {
  return Boolean(props.maxSizeBytes) && file.size > (props.maxSizeBytes as number);
}

function addFiles(list: FileList | null) {
  if (!list || list.length === 0) return;
  const incoming = Array.from(list);
  emit("update:modelValue", props.multiple ? [...props.modelValue, ...incoming] : incoming.slice(0, 1));
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  addFiles(target.files);
  target.value = "";
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  if (!props.disabled) dragging.value = true;
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  dragging.value = false;
  if (props.disabled) return;
  addFiles(event.dataTransfer?.files ?? null);
}

function removeAt(index: number) {
  emit(
    "update:modelValue",
    props.modelValue.filter((_, i) => i !== index)
  );
}
</script>

<template>
  <div class="cp-field">
    <span v-if="label" class="cp-field__label">{{ label }}</span>
    <div class="cp-file-uploader">
      <label
        :class="[
          'cp-file-uploader__dropzone',
          dragging && 'cp-file-uploader__dropzone--dragging',
          errorText && 'cp-file-uploader__dropzone--invalid',
          disabled && 'cp-file-uploader__dropzone--disabled',
        ]"
        @dragover="onDragOver"
        @dragleave="dragging = false"
        @drop="onDrop"
      >
        <input
          type="file"
          class="cp-visually-hidden"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          @change="onInputChange"
        />
        <span class="cp-file-uploader__icon" aria-hidden="true">↑</span>
        <span class="cp-file-uploader__hint">Arraste ficheiros para aqui ou clique para procurar</span>
      </label>
      <ul v-if="modelValue.length > 0" class="cp-file-uploader__list">
        <li
          v-for="(file, index) in modelValue"
          :key="`${file.name}-${index}`"
          :class="['cp-file-uploader__item', isOversize(file) && 'cp-file-uploader__item--invalid']"
        >
          <span class="cp-file-uploader__item-name">{{ file.name }}</span>
          <span class="cp-file-uploader__item-size">
            {{ isOversize(file) ? "Excede o tamanho máximo" : formatBytes(file.size) }}
          </span>
          <button
            type="button"
            class="cp-file-uploader__item-remove"
            :aria-label="`Remover ${file.name}`"
            @click="removeAt(index)"
          >
            ×
          </button>
        </li>
      </ul>
    </div>
    <span v-if="errorText || helperText" :class="['cp-field__helper', errorText && 'cp-field__helper--error']">
      {{ errorText || helperText }}
    </span>
  </div>
</template>
