import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("mostra as iniciais quando não há imagem", () => {
    render(<Avatar name="Guilherme Oliveira" />);
    expect(screen.getByText("GO")).toBeInTheDocument();
  });

  it("usa apenas a inicial do primeiro nome quando é um nome único", () => {
    render(<Avatar name="Madonna" />);
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("expõe role=img com aria-label do nome", () => {
    render(<Avatar name="Guilherme Oliveira" />);
    expect(screen.getByRole("img", { name: "Guilherme Oliveira" })).toBeInTheDocument();
  });

  it("renderiza a imagem quando src é fornecido", () => {
    render(<Avatar name="Guilherme Oliveira" src="/avatar.jpg" />);
    const img = screen.getByRole("img", { name: "Guilherme Oliveira" }).querySelector("img");
    expect(img).toHaveAttribute("src", "/avatar.jpg");
  });

  it("mostra o indicador de estado quando definido", () => {
    render(<Avatar name="Guilherme Oliveira" status="online" />);
    expect(document.querySelector(".cp-avatar__status--online")).toBeInTheDocument();
  });
});
