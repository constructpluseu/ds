import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpToggletip from "./CpToggletip.vue";

describe("CpToggletip", () => {
  it("não mostra o conteúdo por predefinição", () => {
    const wrapper = mount(CpToggletip, { slots: { default: "Explicação adicional" } });
    expect(wrapper.find('[role="status"]').exists()).toBe(false);
  });

  it("mostra o conteúdo ao clicar no gatilho", async () => {
    const wrapper = mount(CpToggletip, { slots: { default: "Explicação adicional" } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.find('[role="status"]').text()).toBe("Explicação adicional");
    expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
  });
});
