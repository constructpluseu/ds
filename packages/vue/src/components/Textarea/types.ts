import type { CpFieldSize } from "../TextInput/types";

export interface CpTextareaProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: CpFieldSize;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  modelValue?: string;
  placeholder?: string;
  rows?: number;
}
