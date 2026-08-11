import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("usa role=switch e alterna ao clicar", async () => {
    render(<Toggle label="Notificações por email" />);
    const toggle = screen.getByRole("switch", { name: "Notificações por email" });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
