import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpLink from "./CpLink.vue";

describe("CpLink", () => {
  it("renderiza um <a> com o href fornecido", () => {
    const wrapper = mount(CpLink, { props: { href: "/obras" }, slots: { default: "Ver obras" } });
    expect(wrapper.attributes("href")).toBe("/obras");
  });

  it("adiciona target=_blank e rel seguro quando external", () => {
    const wrapper = mount(CpLink, { props: { href: "https://exemplo.pt", external: true } });
    expect(wrapper.attributes("target")).toBe("_blank");
    expect(wrapper.attributes("rel")).toBe("noopener noreferrer");
  });
});
