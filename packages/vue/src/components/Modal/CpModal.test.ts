import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpModal from "./CpModal.vue";

describe("CpModal", () => {
  it("não renderiza nada quando open=false", () => {
    const wrapper = mount(CpModal, { props: { open: false, title: "Eliminar contrato" } });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("expõe role=dialog, aria-modal e associa o título", () => {
    const wrapper = mount(CpModal, { props: { open: true, title: "Eliminar contrato" } });
    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.attributes("aria-modal")).toBe("true");
    const titleId = dialog.attributes("aria-labelledby");
    expect(wrapper.find(`#${titleId}`).text()).toBe("Eliminar contrato");
  });

  it("emite close ao clicar no botão de fechar", async () => {
    const wrapper = mount(CpModal, { props: { open: true, title: "Eliminar contrato" } });
    await wrapper.find(".cp-modal__close").trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("emite close ao clicar no backdrop", async () => {
    const wrapper = mount(CpModal, { props: { open: true, title: "Eliminar contrato" } });
    await wrapper.find(".cp-modal-overlay").trigger("mousedown");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
