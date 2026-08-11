import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpPagination from "./CpPagination.vue";

describe("CpPagination", () => {
  it("desativa 'Página anterior' na primeira página", () => {
    const wrapper = mount(CpPagination, { props: { page: 1, totalPages: 5 } });
    expect(wrapper.find('[aria-label="Página anterior"]').attributes("disabled")).toBeDefined();
  });

  it("emite update:page com a página correta", async () => {
    const wrapper = mount(CpPagination, { props: { page: 2, totalPages: 5 } });
    await wrapper.find('[aria-label="Página seguinte"]').trigger("click");
    expect(wrapper.emitted("update:page")?.[0]).toEqual([3]);
  });
});
