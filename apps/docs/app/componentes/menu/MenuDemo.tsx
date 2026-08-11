"use client";

import { Button, Menu } from "@constructpluseu/react";

export function MenuDemo() {
  return (
    <Menu
      trigger={<Button variant="secondary">Ações da obra ⌄</Button>}
      items={[
        { id: "editar", label: "Editar obra", onSelect: () => {} },
        { id: "duplicar", label: "Duplicar", onSelect: () => {} },
        { id: "arquivar", label: "Arquivar", onSelect: () => {} },
        { id: "eliminar", label: "Eliminar obra", onSelect: () => {}, danger: true },
      ]}
    />
  );
}
