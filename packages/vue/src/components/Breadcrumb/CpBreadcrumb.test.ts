import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpBreadcrumb from "./CpBreadcrumb.vue";

const items = [
  { label: "Obras", href: "/obras" },
  { label: "Orçamento" },
];

describe("CpBreadcrumb", () => {
  it("renderiza link para o primeiro item e span para o último", () => {
    const wrapper = mount(CpBreadcrumb, { props: { items } });
    expect(wrapper.find("a").attributes("href")).toBe("/obras");
    const current = wrapper.findAll("span.cp-breadcrumb__current");
    expect(current[0].attributes("aria-current")).toBe("page");
  });
});
