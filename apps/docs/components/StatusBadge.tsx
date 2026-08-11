import type { ComponentStatus } from "@/lib/component-registry";

export function StatusBadge({ status }: { status: ComponentStatus }) {
  return (
    <span className={`cp-docs-badge cp-docs-badge--${status}`}>
      {status === "disponivel" ? "Disponível" : "Planeado"}
    </span>
  );
}
