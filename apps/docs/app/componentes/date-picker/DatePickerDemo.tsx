"use client";

import { useState } from "react";
import { DatePicker } from "@constructpluseu/react";

export function DatePickerDemo() {
  const [value, setValue] = useState<string | null>(null);
  return <DatePicker label="Data de início da obra" value={value} onChange={setValue} />;
}

export function DatePickerLimitadoDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePicker
      label="Data de vistoria"
      value={value}
      onChange={setValue}
      minDate="2026-08-01"
      maxDate="2026-12-31"
      helperText="Disponível entre agosto e dezembro de 2026."
    />
  );
}
