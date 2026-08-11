import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpNumberInput from "./CpNumberInput.vue";

describe("CpNumberInput", () => {
  it("emite update:modelValue incrementado ao clicar em Aumentar", async () => {
    const wrapper = mount(CpNumberInput, { props: { label: "Quantidade", modelValue: 5 } });
    await wrapper.find('[aria-label="Aumentar"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([6]);
  });

  it("desativa 'Diminuir' no limite mínimo", () => {
    const wrapper = mount(CpNumberInput, { props: { label: "Quantidade", modelValue: 0, min: 0 } });
    expect(wrapper.find('[aria-label="Diminuir"]').attributes("disabled")).toBeDefined();
  });
});
