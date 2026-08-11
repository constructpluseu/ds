import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTextarea from "./CpTextarea.vue";

describe("CpTextarea", () => {
  it("emite update:modelValue ao digitar", async () => {
    const wrapper = mount(CpTextarea, { props: { label: "Notas" } });
    await wrapper.find("textarea").setValue("Linha 1\nLinha 2");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Linha 1\nLinha 2"]);
  });
});
