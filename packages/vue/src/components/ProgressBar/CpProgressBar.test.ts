import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpProgressBar from "./CpProgressBar.vue";

describe("CpProgressBar", () => {
  it("expõe role=progressbar com os valores corretos", () => {
    const wrapper = mount(CpProgressBar, { props: { label: "Aprovisionamento", value: 40, max: 100 } });
    const bar = wrapper.find("[role=progressbar]");
    expect(bar.attributes("aria-valuenow")).toBe("40");
  });

  it("não expõe aria-valuenow quando indeterminate", () => {
    const wrapper = mount(CpProgressBar, { props: { indeterminate: true } });
    expect(wrapper.find("[role=progressbar]").attributes("aria-valuenow")).toBeUndefined();
  });
});
