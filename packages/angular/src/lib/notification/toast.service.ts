import { Injectable, signal } from "@angular/core";
import type { CpNotificationStatus } from "./inline-notification.component";

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

@Injectable({ providedIn: "root" })
export class CpToastService {
  readonly toasts = signal<CpToastItem[]>([]);

  show(options: CpToastOptions): string {
    const id = `cp-toast-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    const toast: CpToastItem = {
      status: "info",
      duration: 5000,
      ...options,
      id,
    };
    this.toasts.update((items) => [...items, toast]);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  dismiss(id: string): void {
    this.toasts.update((items) => items.filter((item) => item.id !== id));
  }
}
