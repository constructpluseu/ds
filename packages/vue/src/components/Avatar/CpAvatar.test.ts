import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpAvatar from "./CpAvatar.vue";

describe("CpAvatar", () => {
  it("mostra as iniciais quando não há imagem", () => {
    const wrapper = mount(CpAvatar, { props: { name: "Guilherme Oliveira" } });
    expect(wrapper.text()).toBe("GO");
  });

  it("renderiza a imagem quando src é fornecido", () => {
    const wrapper = mount(CpAvatar, { props: { name: "Guilherme Oliveira", src: "/avatar.jpg" } });
    expect(wrapper.find("img").attributes("src")).toBe("/avatar.jpg");
  });

  it("mostra o indicador de estado quando definido", () => {
    const wrapper = mount(CpAvatar, { props: { name: "Guilherme Oliveira", status: "online" } });
    expect(wrapper.find(".cp-avatar__status--online").exists()).toBe(true);
  });
});
