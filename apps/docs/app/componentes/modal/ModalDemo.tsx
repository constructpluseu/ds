"use client";

import { useState } from "react";
import { Button, Modal } from "@constructpluseu/react";

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Eliminar contrato
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Eliminar contrato"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Eliminar
            </Button>
          </>
        }
      >
        Esta ação não pode ser revertida. O contrato e todos os documentos associados serão
        removidos permanentemente.
      </Modal>
    </>
  );
}
