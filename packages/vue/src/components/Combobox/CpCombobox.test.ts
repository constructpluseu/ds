import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpCombobox from "./CpCombobox.vue";
import { expectNoA11yViolations } from "../../test-utils/a11y";

const options = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
];

describe("CpCombobox (seleção única)", () => {
  it("não tem violações de acessibilidade (axe-core) com a lista aberta", async () => {
    const wrapper = mount(CpCombobox, {
      props: { label: "Tipo de obra", options, modelValue: [] },
      attachTo: document.body,
    });
    await wrapper.find('[role="combobox"]').trigger("focus");
    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("mostra as opções ao focar", async () => {
    const wrapper = mount(CpCombobox, { props: { label: "Tipo de obra", options, modelValue: [] } });
    await wrapper.find('[role="combobox"]').trigger("focus");
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2);
  });

  it("emite update:modelValue ao selecionar uma opção", async () => {
    const wrapper = mount(CpCombobox, { props: { label: "Tipo de obra", options, modelValue: [] } });
    await wrapper.find('[role="combobox"]').trigger("focus");
    await wrapper.find('[role="option"]').trigger("mousedown");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["residencial"]]);
  });

  it("mostra o rótulo selecionado quando fechado", () => {
    const wrapper = mount(CpCombobox, {
      props: { label: "Tipo de obra", options, modelValue: ["comercial"] },
    });
    expect((wrapper.find('[role="combobox"]').element as HTMLInputElement).value).toBe("Comercial");
  });
});

describe("CpCombobox (multiple)", () => {
  it("mostra tags para cada seleção", () => {
    const wrapper = mount(CpCombobox, {
      props: { label: "Especialidades", options, modelValue: ["residencial"], multiple: true },
    });
    expect(wrapper.text()).toContain("Residencial");
  });
});
