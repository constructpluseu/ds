import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton } from "./RadioButton";

describe("RadioButton", () => {
  it("permite escolher uma opção entre um grupo pelo atributo name", async () => {
    render(
      <div>
        <RadioButton name="tipo" value="residencial" label="Residencial" />
        <RadioButton name="tipo" value="comercial" label="Comercial" />
      </div>
    );
    const residencial = screen.getByLabelText("Residencial");
    const comercial = screen.getByLabelText("Comercial");

    await userEvent.click(residencial);
    expect(residencial).toBeChecked();
    expect(comercial).not.toBeChecked();

    await userEvent.click(comercial);
    expect(residencial).not.toBeChecked();
    expect(comercial).toBeChecked();
  });
});
