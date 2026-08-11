import { reactive } from "vue";

export type CpNotificationStatus = "info" | "success" | "warning" | "danger";

export interface CpToastOptions {
  title: string;
  description?: string;
  status?: CpNotificationStatus;
  /** Duração em ms antes do auto-dismiss. Usar 0 para não fechar automaticamente. */
  duration?: number;
}

export interface CpToastItem extends CpToastOptions {
  id: string;
  status: CpNotificationStatus;
  duration: number;
}

export const toastState = reactive<{ items: CpToastItem[] }>({ items: [] });

export function showToast(options: CpToastOptions): string {
  const id = `cp-toast-${Math.random().toString(36).slice(2)}-${Date.now()}`;
  const toast: CpToastItem = {
    status: "info",
    duration: 5000,
    ...options,
    id,
  };
  toastState.items.push(toast);

  if (toast.duration > 0) {
    setTimeout(() => dismissToast(id), toast.duration);
  }

  return id;
}

export function dismissToast(id: string): void {
  const index = toastState.items.findIndex((item) => item.id === id);
  if (index !== -1) {
    toastState.items.splice(index, 1);
  }
}

export function useToast() {
  return { show: showToast, dismiss: dismissToast };
}
