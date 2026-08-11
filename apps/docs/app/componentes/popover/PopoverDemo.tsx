"use client";

import { Button, Popover } from "@constructpluseu/react";

export function PopoverDemo() {
  return (
    <Popover trigger={<Button variant="secondary">Detalhes do módulo</Button>}>
      <p style={{ fontWeight: "var(--cp-font-weight-semibold)", marginBottom: "var(--cp-space-2)" }}>
        Aprovisionamento
      </p>
      <p style={{ margin: 0 }}>
        Catálogo de materiais, cotação multi-fornecedor e stock em tempo real, partilhando a
        mesma base de dados dos restantes módulos.
      </p>
    </Popover>
  );
}
