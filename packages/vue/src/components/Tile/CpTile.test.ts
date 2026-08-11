import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTile from "./CpTile.vue";

describe("CpTile", () => {
  it("renderiza como <a> quando href é fornecido", () => {
    const wrapper = mount(CpTile, { props: { href: "/modulos/aprovisionamento", title: "Aprovisionamento" } });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/modulos/aprovisionamento");
  });

  it("renderiza como <button> quando não há href", () => {
    const wrapper = mount(CpTile, { props: { title: "Aprovisionamento" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
  });
});
