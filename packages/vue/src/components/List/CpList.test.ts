import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpList from "./CpList.vue";

describe("CpList", () => {
  it("renderiza um <ul> por predefinição com os itens", () => {
    const wrapper = mount(CpList, { props: { items: ["Materiais", "Equipa"] } });
    expect(wrapper.element.tagName).toBe("UL");
    expect(wrapper.findAll("li")).toHaveLength(2);
  });

  it("renderiza um <ol> quando ordered=true", () => {
    const wrapper = mount(CpList, { props: { items: ["A"], ordered: true } });
    expect(wrapper.element.tagName).toBe("OL");
  });
});
