import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpStructuredList from "./CpStructuredList.vue";

describe("CpStructuredList", () => {
  it("renderiza cabeçalhos e linhas", () => {
    const wrapper = mount(CpStructuredList, {
      props: {
        headers: ["Material", "Quantidade"],
        rows: [
          ["Cimento", "50 sacos"],
          ["Areia", "3 m³"],
        ],
      },
    });
    expect(wrapper.findAll("th")).toHaveLength(2);
    expect(wrapper.findAll("tr")).toHaveLength(3);
    expect(wrapper.text()).toContain("50 sacos");
  });
});
