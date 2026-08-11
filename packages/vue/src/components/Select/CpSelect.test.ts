import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpSelect from "./CpSelect.vue";

const options = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
];

describe("CpSelect", () => {
  it("lista as opções fornecidas", () => {
    const wrapper = mount(CpSelect, { props: { label: "Tipo de obra", options } });
    expect(wrapper.findAll("option")).toHaveLength(2);
  });

  it("emite update:modelValue ao escolher uma opção", async () => {
    const wrapper = mount(CpSelect, { props: { label: "Tipo de obra", options } });
    await wrapper.find("select").setValue("comercial");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["comercial"]);
  });
});
