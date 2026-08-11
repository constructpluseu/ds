import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpSkeleton from "./CpSkeleton.vue";

describe("CpSkeleton", () => {
  it("é oculto de leitores de ecrã (aria-hidden)", () => {
    const wrapper = mount(CpSkeleton);
    expect(wrapper.attributes("aria-hidden")).toBe("true");
  });

  it("aplica a classe da variante", () => {
    const wrapper = mount(CpSkeleton, { props: { variant: "circle" } });
    expect(wrapper.classes()).toContain("cp-skeleton--circle");
  });
});
