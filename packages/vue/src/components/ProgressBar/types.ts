export interface CpProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  status?: "default" | "danger";
}
