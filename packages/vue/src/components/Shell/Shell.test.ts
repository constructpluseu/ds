import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpHeader from "./CpHeader.vue";
import CpSideNav from "./CpSideNav.vue";
import type { SideNavItem } from "./types";

describe("CpHeader", () => {
  it("mostra a marca e as ações via slot", () => {
    const wrapper = mount(CpHeader, {
      props: { brand: "Construct+" },
      slots: { default: "<button>Perfil</button>" },
    });
    expect(wrapper.text()).toContain("Construct+");
    expect(wrapper.text()).toContain("Perfil");
  });

  it("mostra o botão de menu e emite menuToggle", async () => {
    const wrapper = mount(CpHeader, { props: { brand: "Construct+", menuButton: true, navOpen: false } });
    await wrapper.find('[aria-label="Abrir menu de navegação"]').trigger("click");
    expect(wrapper.emitted("menuToggle")).toHaveLength(1);
  });
});

const items: SideNavItem[] = [
  { id: "obras", label: "Obras", href: "/obras" },
  {
    id: "financeiro",
    label: "Financeiro",
    href: "/financeiro",
    children: [
      { id: "orcamentos", label: "Orçamentos", href: "/financeiro/orcamentos" },
      { id: "faturas", label: "Faturas", href: "/financeiro/faturas" },
    ],
  },
];

describe("CpSideNav", () => {
  it("mostra os itens de topo e marca o item ativo", () => {
    const wrapper = mount(CpSideNav, { props: { items, activeId: "obras", expandedIds: [] } });
    expect(wrapper.find('a[href="/obras"]').attributes("aria-current")).toBe("page");
  });

  it("não mostra sub-itens quando o grupo está fechado", () => {
    const wrapper = mount(CpSideNav, { props: { items, expandedIds: [] } });
    expect(wrapper.text()).not.toContain("Orçamentos");
  });

  it("emite expandedChange ao clicar num grupo", async () => {
    const wrapper = mount(CpSideNav, { props: { items, expandedIds: [] } });
    await wrapper.find(".cp-side-nav__toggle").trigger("click");
    expect(wrapper.emitted("expandedChange")?.[0]).toEqual([["financeiro"]]);
  });

  it("mostra os sub-itens quando o grupo está expandido", () => {
    const wrapper = mount(CpSideNav, { props: { items, expandedIds: ["financeiro"] } });
    expect(wrapper.text()).toContain("Orçamentos");
    expect(wrapper.text()).toContain("Faturas");
  });
});
