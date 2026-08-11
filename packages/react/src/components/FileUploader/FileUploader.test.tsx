import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploader } from "./FileUploader";

function createFile(name: string, size: number, type = "application/pdf") {
  return new File(["a".repeat(size)], name, { type });
}

describe("FileUploader", () => {
  it("mostra a instrução de arrastar e largar", () => {
    render(<FileUploader label="Documentos" files={[]} onChange={vi.fn()} />);
    expect(screen.getByText("Arraste ficheiros para aqui ou clique para procurar")).toBeInTheDocument();
  });

  it("adiciona um ficheiro selecionado e chama onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<FileUploader label="Documentos" files={[]} onChange={handleChange} />);
    const file = createFile("planta.pdf", 100);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, file);
    expect(handleChange).toHaveBeenCalledWith([file]);
  });

  it("mostra os ficheiros já adicionados com o tamanho formatado", () => {
    const file = createFile("orcamento.pdf", 2048);
    render(<FileUploader label="Documentos" files={[file]} onChange={vi.fn()} />);
    expect(screen.getByText("orcamento.pdf")).toBeInTheDocument();
    expect(screen.getByText("2.0 KB")).toBeInTheDocument();
  });

  it("remove um ficheiro ao clicar no botão de remover", async () => {
    const user = userEvent.setup();
    const file = createFile("planta.pdf", 100);
    const handleChange = vi.fn();
    render(<FileUploader label="Documentos" files={[file]} onChange={handleChange} />);
    await user.click(screen.getByRole("button", { name: "Remover planta.pdf" }));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("marca ficheiros que excedem o tamanho máximo", () => {
    const file = createFile("grande.pdf", 5000);
    render(<FileUploader label="Documentos" files={[file]} onChange={vi.fn()} maxSizeBytes={1000} />);
    expect(screen.getByText("Excede o tamanho máximo")).toBeInTheDocument();
  });

  it("adiciona ficheiros largados via drag-and-drop", () => {
    const handleChange = vi.fn();
    render(<FileUploader label="Documentos" files={[]} onChange={handleChange} multiple />);
    const file = createFile("foto.jpg", 100, "image/jpeg");
    const dropzone = screen.getByText("Arraste ficheiros para aqui ou clique para procurar").closest("label")!;
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
    expect(handleChange).toHaveBeenCalledWith([file]);
  });
});
