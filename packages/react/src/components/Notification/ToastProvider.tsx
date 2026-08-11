import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { NotificationStatus } from "./InlineNotification";

export interface ToastOptions {
  title: string;
  description?: string;
  status?: NotificationStatus;
  /** Duração em ms antes do auto-dismiss. Usar 0 para não fechar automaticamente. */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  status: NotificationStatus;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const id = `cp-toast-${Math.random().toString(36).slice(2)}-${Date.now()}`;
      const toast: ToastItem = { status: "info", duration: 5000, ...options, id };
      setToasts((current) => [...current, toast]);
      if (toast.duration > 0) {
        setTimeout(() => dismiss(id), toast.duration);
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastRegion />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast() foi chamado fora de um <ToastProvider>. Envolva a aplicação em <ToastProvider> uma única vez, próximo da raiz."
    );
  }
  return { show: context.show, dismiss: context.dismiss };
}

function ToastRegion() {
  const context = useContext(ToastContext);
  if (!context) return null;

  return (
    <div className="cp-toast-region" aria-live="polite" aria-atomic="true">
      {context.toasts.map((toast) => (
        <div
          key={toast.id}
          className={["cp-toast", `cp-toast--${toast.status}`].join(" ")}
          role={toast.status === "danger" ? "alert" : "status"}
        >
          <div className="cp-notification__content">
            <p className="cp-notification__title">{toast.title}</p>
            {toast.description && (
              <p className="cp-notification__description">{toast.description}</p>
            )}
          </div>
          <button
            type="button"
            className="cp-notification__close"
            aria-label="Fechar notificação"
            onClick={() => context.dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
