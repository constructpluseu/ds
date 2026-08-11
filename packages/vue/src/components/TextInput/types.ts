export type CpFieldSize = "sm" | "md" | "lg";

export interface CpTextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: CpFieldSize;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  modelValue?: string;
  type?: string;
  placeholder?: string;
}
