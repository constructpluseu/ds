import type { CpFieldSize } from "../TextInput/types";

export interface CpSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CpSelectProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: CpFieldSize;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  modelValue?: string;
  options: CpSelectOption[];
  placeholder?: string;
}
