"use client";

import { useState } from "react";
import { Search } from "@constructpluseu/react";

export function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <Search
      label="Procurar obras"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
    />
  );
}
