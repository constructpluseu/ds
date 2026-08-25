import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";
import { expectNoA11yViolations } from "../../test-utils/a11y";

describe("Modal", () => {
  it("não tem violações de acessibilidade (axe-core)", async () => {
    const { container } = render(
      <Modal open onClose={() => {}} title="Eliminar contrato">
        <p>Confirma a eliminação?</p>
        <button type="button">Confirmar</button>
      </Modal>
    );
    await expectNoA11yViolations(container);
  });

  it("não renderiza nada quando open=false", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Eliminar contrato">
        Confirma a eliminação?
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("expõe role=dialog, aria-modal e associa o título", () => {
    render(
      <Modal open onClose={() => {}} title="Eliminar contrato">
        Confirma a eliminação?
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const titleId = dialog.getAttribute("aria-labelledby");
    expect(screen.getByText("Eliminar contrato").id).toBe(titleId);
  });

  it("move o foco para dentro do modal ao abrir", () => {
    render(
      <Modal open onClose={() => {}} title="Eliminar contrato">
        <button>Confirmar</button>
      </Modal>
    );
    expect(document.activeElement).toHaveAccessibleName("Fechar");
  });

  it("chama onClose ao premir Escape", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Eliminar contrato">
        Confirma?
      </Modal>
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("chama onClose ao clicar no backdrop", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Eliminar contrato">
        Confirma?
      </Modal>
    );
    const overlay = document.querySelector(".cp-modal-overlay") as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("não fecha ao clicar dentro da caixa de diálogo", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Eliminar contrato">
        Confirma?
      </Modal>
    );
    await userEvent.click(screen.getByText("Confirma?"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
