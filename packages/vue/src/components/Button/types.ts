export type CpButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type CpButtonSize = "sm" | "md" | "lg";

export interface CpButtonProps {
  variant?: CpButtonVariant;
  size?: CpButtonSize;
  /** Mostra um spinner e desativa o botão, mantendo aria-busy para leitores de ecrã. */
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
