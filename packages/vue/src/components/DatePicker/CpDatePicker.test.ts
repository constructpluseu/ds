import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpDatePicker from "./CpDatePicker.vue";
import { expectNoA11yViolations } from "../../test-utils/a11y";

describe("CpDatePicker", () => {
  it("não tem violações de acessibilidade (axe-core) com o calendário aberto", async () => {
    const wrapper = mount(CpDatePicker, {
      props: { label: "Data de início", modelValue: "2026-08-10" },
      attachTo: document.body,
    });
    await wrapper.find('[role="combobox"]').trigger("click");
    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("mostra a data selecionada formatada no campo", () => {
    const wrapper = mount(CpDatePicker, {
      props: { label: "Data de início", modelValue: "2026-08-10" },
    });
    expect((wrapper.find('[role="combobox"]').element as HTMLInputElement).value).toBe("10/08/2026");
  });

  it("abre o calendário ao clicar no campo", async () => {
    const wrapper = mount(CpDatePicker, { props: { label: "Data de início", modelValue: null } });
    await wrapper.find('[role="combobox"]').trigger("click");
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it("emite update:modelValue com o valor ISO ao selecionar uma data", async () => {
    const wrapper = mount(CpDatePicker, {
      props: { label: "Data de início", modelValue: "2026-08-01" },
    });
    await wrapper.find('[role="combobox"]').trigger("click");
    const day = wrapper.findAll("button").find((btn) => btn.attributes("aria-label") === "15 de agosto de 2026");
    await day?.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["2026-08-15"]);
  });

  it("desativa dias fora do intervalo minDate/maxDate", async () => {
    const wrapper = mount(CpDatePicker, {
      props: {
        label: "Data de início",
        modelValue: "2026-08-10",
        minDate: "2026-08-05",
        maxDate: "2026-08-20",
      },
    });
    await wrapper.find('[role="combobox"]').trigger("click");
    const outOfRange = wrapper.findAll("button").find((btn) => btn.attributes("aria-label") === "1 de agosto de 2026");
    expect(outOfRange?.attributes("disabled")).toBeDefined();
  });
});
