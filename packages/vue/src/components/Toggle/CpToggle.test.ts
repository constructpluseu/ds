import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpToggle from "./CpToggle.vue";

describe("CpToggle", () => {
  it("usa role=switch e emite update:modelValue ao alternar", async () => {
    const wrapper = mount(CpToggle, { props: { label: "Notificações por email" } });
    const input = wrapper.find("input[role=switch]");
    await input.setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });
});
