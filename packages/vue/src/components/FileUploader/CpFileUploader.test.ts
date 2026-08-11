import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpFileUploader from "./CpFileUploader.vue";

function createFile(name: string, size: number, type = "application/pdf") {
  return new File(["a".repeat(size)], name, { type });
}

describe("CpFileUploader", () => {
  it("mostra a instrução de arrastar e largar", () => {
    const wrapper = mount(CpFileUploader, { props: { label: "Documentos", modelValue: [] } });
    expect(wrapper.text()).toContain("Arraste ficheiros para aqui ou clique para procurar");
  });

  it("mostra os ficheiros já adicionados com o tamanho formatado", () => {
    const file = createFile("orcamento.pdf", 2048);
    const wrapper = mount(CpFileUploader, { props: { label: "Documentos", modelValue: [file] } });
    expect(wrapper.text()).toContain("orcamento.pdf");
    expect(wrapper.text()).toContain("2.0 KB");
  });

  it("remove um ficheiro e emite update:modelValue", async () => {
    const file = createFile("planta.pdf", 100);
    const wrapper = mount(CpFileUploader, { props: { label: "Documentos", modelValue: [file] } });
    await wrapper.find('[aria-label="Remover planta.pdf"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([[]]);
  });

  it("marca ficheiros que excedem o tamanho máximo", () => {
    const file = createFile("grande.pdf", 5000);
    const wrapper = mount(CpFileUploader, {
      props: { label: "Documentos", modelValue: [file], maxSizeBytes: 1000 },
    });
    expect(wrapper.text()).toContain("Excede o tamanho máximo");
  });

  it("adiciona ficheiros largados via drag-and-drop", async () => {
    const wrapper = mount(CpFileUploader, { props: { label: "Documentos", modelValue: [], multiple: true } });
    const file = createFile("foto.jpg", 100, "image/jpeg");
    await wrapper.find("label").trigger("drop", { dataTransfer: { files: [file] } });
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([[file]]);
  });
});
