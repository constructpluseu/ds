import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTabs from "./CpTabs.vue";
import { expectNoA11yViolations } from "../../test-utils/a11y";

const items = [
  { id: "orcamento", label: "Orçamento" },
  { id: "materiais", label: "Materiais" },
  { id: "equipa", label: "Equipa" },
];

describe("CpTabs", () => {
  it("não tem violações de acessibilidade (axe-core)", async () => {
    const wrapper = mount(CpTabs, {
      props: { items },
      slots: { orcamento: "Conteúdo do orçamento", materiais: "Conteúdo dos materiais" },
      attachTo: document.body,
    });
    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("mostra o painel do primeiro separador por predefinição", () => {
    const wrapper = mount(CpTabs, {
      props: { items },
      slots: {
        orcamento: "Conteúdo do orçamento",
        materiais: "Conteúdo dos materiais",
      },
    });
    expect(wrapper.find('[role="tab"][aria-selected="true"]').text()).toBe("Orçamento");
    expect(wrapper.text()).toContain("Conteúdo do orçamento");
  });

  it("troca de separador ao clicar", async () => {
    const wrapper = mount(CpTabs, {
      props: { items },
      slots: { orcamento: "Conteúdo do orçamento", materiais: "Conteúdo dos materiais" },
    });
    const tabs = wrapper.findAll('[role="tab"]');
    await tabs[1].trigger("click");
    expect(wrapper.text()).toContain("Conteúdo dos materiais");
  });

  it("navega com ArrowRight e emite update:modelValue", async () => {
    const wrapper = mount(CpTabs, {
      props: { items },
      slots: { orcamento: "Conteúdo do orçamento", materiais: "Conteúdo dos materiais" },
      attachTo: document.body,
    });
    const first = wrapper.find('[role="tab"]');
    (first.element as HTMLElement).focus();
    await first.trigger("keydown", { key: "ArrowRight" });
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["materiais"]);
  });
});
