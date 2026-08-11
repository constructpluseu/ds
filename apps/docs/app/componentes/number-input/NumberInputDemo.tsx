"use client";

import { useState } from "react";
import { NumberInput } from "@constructpluseu/react";

export function NumberInputDemo() {
  const [value, setValue] = useState(5);
  return (
    <NumberInput label="Quantidade de sacos de cimento" value={value} min={0} max={50} onChange={setValue} />
  );
}
