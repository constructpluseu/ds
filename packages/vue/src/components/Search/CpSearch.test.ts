import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpSearch from "./CpSearch.vue";

describe("CpSearch", () => {
  it("usa role=searchbox e o label como placeholder", () => {
    const wrapper = mount(CpSearch, { props: { label: "Procurar obras" } });
    expect(wrapper.find('[role="searchbox"]').attributes("placeholder")).toBe("Procurar obras");
  });

  it("mostra o botão de limpar apenas quando clearable e há valor", async () => {
    const wrapper = mount(CpSearch, { props: { modelValue: "obra", clearable: true } });
    expect(wrapper.find('[aria-label="Limpar pesquisa"]').exists()).toBe(true);
  });

  it("emite clear ao clicar no botão de limpar", async () => {
    const wrapper = mount(CpSearch, { props: { modelValue: "obra", clearable: true } });
    await wrapper.find('[aria-label="Limpar pesquisa"]').trigger("click");
    expect(wrapper.emitted("clear")).toHaveLength(1);
  });
});
