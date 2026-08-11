"use client";

import { useState } from "react";
import { Slider } from "@constructpluseu/react";

export function SliderDemo() {
  const [value, setValue] = useState(63);
  return (
    <Slider
      label="Percentagem de execução"
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );
}
