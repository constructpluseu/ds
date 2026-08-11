import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTooltip from "./CpTooltip.vue";

describe("CpTooltip", () => {
  it("fica visível ao receber foco/hover no wrapper e some ao saír", async () => {
    const wrapper = mount(CpTooltip, {
      props: { content: "Guarda as alterações" },
      slots: { default: "<button>Guardar</button>" },
    });
    const tooltip = wrapper.find('[role="tooltip"]');
    expect(tooltip.classes()).not.toContain("cp-tooltip--visible");

    await wrapper.trigger("mouseenter");
    expect(tooltip.classes()).toContain("cp-tooltip--visible");

    await wrapper.trigger("mouseleave");
    expect(tooltip.classes()).not.toContain("cp-tooltip--visible");
  });
});
