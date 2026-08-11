import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpSlider from "./CpSlider.vue";

describe("CpSlider", () => {
  it("associa o label ao campo e mostra o valor", () => {
    const wrapper = mount(CpSlider, { props: { label: "Progresso", modelValue: 40 } });
    expect(wrapper.text()).toContain("40");
    expect(wrapper.find("input").attributes("type")).toBe("range");
  });

  it("emite update:modelValue ao alterar o valor", async () => {
    const wrapper = mount(CpSlider, { props: { label: "Progresso", modelValue: 40 } });
    await wrapper.find("input").setValue(60);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([60]);
  });
});
