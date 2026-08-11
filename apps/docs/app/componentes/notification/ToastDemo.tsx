"use client";

import { Button, ToastProvider, useToast } from "@constructpluseu/react";

function TriggerButton() {
  const { show } = useToast();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        show({
          title: "Obra guardada com sucesso",
          description: "As alterações foram sincronizadas com todos os dispositivos.",
          status: "success",
        })
      }
    >
      Disparar toast
    </Button>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <TriggerButton />
    </ToastProvider>
  );
}
