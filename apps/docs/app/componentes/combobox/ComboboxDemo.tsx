"use client";

import { useState } from "react";
import { Combobox } from "@constructpluseu/react";

const tiposDeObra = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "reabilitacao", label: "Reabilitação" },
  { value: "infraestrutura", label: "Infraestrutura" },
];

export function ComboboxDemo() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Combobox
      label="Tipo de obra"
      options={tiposDeObra}
      value={value}
      onChange={setValue}
    />
  );
}

export function ComboboxMultiploDemo() {
  const [value, setValue] = useState<string[]>(["residencial"]);
  return (
    <Combobox
      label="Especialidades"
      options={tiposDeObra}
      value={value}
      onChange={setValue}
      multiple
    />
  );
}
