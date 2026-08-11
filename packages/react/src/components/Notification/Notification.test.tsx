import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InlineNotification } from "./InlineNotification";
import { ToastProvider, useToast } from "./ToastProvider";

describe("InlineNotification", () => {
  it("usa role=alert para status danger e role=status para os demais", () => {
    render(<InlineNotification status="danger" title="Falha ao guardar" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("chama onClose ao clicar em fechar", async () => {
    const onClose = vi.fn();
    render(<InlineNotification title="Guardado" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Fechar notificação" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

function ToastTrigger() {
  const { show } = useToast();
  return (
    <button
      onClick={() =>
        show({ title: "Obra guardada com sucesso", status: "success", duration: 0 })
      }
    >
      Disparar
    </button>
  );
}

describe("ToastProvider + useToast", () => {
  it("mostra um toast disparado via useToast().show", async () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "Disparar" }));
    expect(await screen.findByText("Obra guardada com sucesso")).toBeInTheDocument();
  });

  it("lança erro claro quando useToast é usado fora do ToastProvider", () => {
    function Bare() {
      useToast();
      return null;
    }
    expect(() => render(<Bare />)).toThrow(/ToastProvider/);
  });

  it("remove o toast ao clicar em fechar", async () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "Disparar" }));
    await screen.findByText("Obra guardada com sucesso");
    await userEvent.click(screen.getByRole("button", { name: "Fechar notificação" }));
    expect(screen.queryByText("Obra guardada com sucesso")).not.toBeInTheDocument();
  });
});
