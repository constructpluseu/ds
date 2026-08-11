import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CpFileUploaderComponent } from "./file-uploader.component";

function createFile(name: string, size: number, type = "application/pdf"): File {
  return new File(["a".repeat(size)], name, { type });
}

@Component({
  standalone: true,
  imports: [CpFileUploaderComponent],
  template: `
    <cp-file-uploader
      label="Documentos"
      [value]="value"
      [multiple]="multiple"
      [maxSizeBytes]="maxSizeBytes"
      (valueChange)="value = $event"
    ></cp-file-uploader>
  `,
})
class HostComponent {
  value: File[] = [];
  multiple = false;
  maxSizeBytes: number | null = null;
}

describe("CpFileUploaderComponent", () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("mostra a instrução de arrastar e largar", () => {
    expect(fixture.nativeElement.textContent).toContain(
      "Arraste ficheiros para aqui ou clique para procurar"
    );
  });

  it("adiciona um ficheiro selecionado e emite valueChange", () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="file"]');
    const file = createFile("planta.pdf", 100);
    Object.defineProperty(input, "files", { value: [file] });
    input.dispatchEvent(new Event("change"));
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual([file]);
  });

  it("mostra os ficheiros já adicionados com o tamanho formatado", () => {
    fixture.componentInstance.value = [createFile("orcamento.pdf", 2048)];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("orcamento.pdf");
    expect(fixture.nativeElement.textContent).toContain("2.0 KB");
  });

  it("remove um ficheiro ao clicar no botão de remover", () => {
    fixture.componentInstance.value = [createFile("planta.pdf", 100)];
    fixture.detectChanges();
    const removeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      ".cp-file-uploader__item-remove"
    );
    removeButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual([]);
  });

  it("marca ficheiros que excedem o tamanho máximo", () => {
    fixture.componentInstance.maxSizeBytes = 1000;
    fixture.componentInstance.value = [createFile("grande.pdf", 5000)];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Excede o tamanho máximo");
  });

  it("adiciona ficheiros largados via drag-and-drop", () => {
    fixture.componentInstance.multiple = true;
    fixture.detectChanges();
    const label: HTMLLabelElement = fixture.nativeElement.querySelector("label");
    const file = createFile("foto.jpg", 100, "image/jpeg");
    const dropEvent = new Event("drop", { cancelable: true }) as Event & { dataTransfer?: unknown };
    Object.defineProperty(dropEvent, "dataTransfer", { value: { files: [file] } });
    label.dispatchEvent(dropEvent);
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toEqual([file]);
  });
});
