import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTextInput from "./CpTextInput.vue";

describe("CpTextInput", () => {
  it("associa o label ao campo", () => {
    const wrapper = mount(CpTextInput, { props: { label: "Nome da obra" } });
    const input = wrapper.find("input");
    const label = wrapper.find("label");
    expect(label.attributes("for")).toBe(input.attributes("id"));
  });

  it("emite update:modelValue ao digitar", async () => {
    const wrapper = mount(CpTextInput, { props: { label: "Nome" } });
    const input = wrapper.find("input");
    await input.setValue("Obra Central");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Obra Central"]);
  });

  it("marca aria-invalid quando há errorText", () => {
    const wrapper = mount(CpTextInput, { props: { label: "Email", errorText: "Email inválido" } });
    expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
    expect(wrapper.text()).toContain("Email inválido");
  });
});
