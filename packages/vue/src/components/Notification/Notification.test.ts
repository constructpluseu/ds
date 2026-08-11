import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpInlineNotification from "./CpInlineNotification.vue";
import CpToastRegion from "./CpToastRegion.vue";
import { dismissToast, showToast, toastState } from "./toast-store";

describe("CpInlineNotification", () => {
  it("usa role=alert para status danger", () => {
    const wrapper = mount(CpInlineNotification, {
      props: { status: "danger", title: "Falha ao guardar" },
    });
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  });

  it("emite close ao clicar em fechar", async () => {
    const wrapper = mount(CpInlineNotification, {
      props: { title: "Guardado", dismissible: true },
    });
    await wrapper.find(".cp-notification__close").trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});

describe("Toast (showToast + CpToastRegion)", () => {
  it("mostra um toast disparado via showToast", async () => {
    toastState.items.forEach((t) => dismissToast(t.id));
    const wrapper = mount(CpToastRegion);
    showToast({ title: "Obra guardada com sucesso", status: "success", duration: 0 });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Obra guardada com sucesso");
  });
});
