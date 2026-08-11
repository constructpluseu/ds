import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpCheckbox from "./CpCheckbox.vue";

describe("CpCheckbox", () => {
  it("emite update:modelValue ao clicar", async () => {
    const wrapper = mount(CpCheckbox, { props: { label: "Aceito os termos" } });
    await wrapper.find("input").setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("aplica indeterminate no elemento nativo", async () => {
    const wrapper = mount(CpCheckbox, { props: { label: "Selecionar todos", indeterminate: true } });
    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });
});
