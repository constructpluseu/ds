import type { ReactNode } from "react";

export type NotificationStatus = "info" | "success" | "warning" | "danger";

export interface InlineNotificationProps {
  status?: NotificationStatus;
  title: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function InlineNotification({
  status = "info",
  title,
  description,
  onClose,
  className,
}: InlineNotificationProps) {
  return (
    <div
      className={["cp-notification", `cp-notification--${status}`, className]
        .filter(Boolean)
        .join(" ")}
      role={status === "danger" ? "alert" : "status"}
    >
      <span className="cp-notification__icon" aria-hidden="true" />
      <div className="cp-notification__content">
        <p className="cp-notification__title">{title}</p>
        {description && <p className="cp-notification__description">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          className="cp-notification__close"
          aria-label="Fechar notificação"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
}
