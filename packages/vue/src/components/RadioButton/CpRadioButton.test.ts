import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpRadioButton from "./CpRadioButton.vue";

describe("CpRadioButton", () => {
  it("marca checked quando modelValue corresponde ao value", () => {
    const wrapper = mount(CpRadioButton, {
      props: { label: "Residencial", name: "tipo", value: "residencial", modelValue: "residencial" },
    });
    expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true);
  });

  it("emite update:modelValue com o próprio value ao selecionar", async () => {
    const wrapper = mount(CpRadioButton, {
      props: { label: "Comercial", name: "tipo", value: "comercial", modelValue: "residencial" },
    });
    await wrapper.find("input").setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["comercial"]);
  });
});
