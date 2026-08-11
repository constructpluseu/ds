import { useState } from "react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";

export interface FileUploaderProps {
  label?: ReactNode;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeBytes?: number;
  helperText?: ReactNode;
  errorText?: ReactNode;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader({
  label,
  files,
  onChange,
  accept,
  multiple = false,
  maxSizeBytes,
  helperText,
  errorText,
  disabled = false,
}: FileUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const invalid = Boolean(errorText);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    onChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  function onDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (!disabled) setDragging(true);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    addFiles(event.dataTransfer.files);
  }

  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="cp-field">
      {label && <span className="cp-field__label">{label}</span>}
      <div className="cp-file-uploader">
        <label
          className={[
            "cp-file-uploader__dropzone",
            dragging ? "cp-file-uploader__dropzone--dragging" : "",
            invalid ? "cp-file-uploader__dropzone--invalid" : "",
            disabled ? "cp-file-uploader__dropzone--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onDragOver={onDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input
            type="file"
            className="cp-visually-hidden"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={onInputChange}
          />
          <span className="cp-file-uploader__icon" aria-hidden="true">
            ↑
          </span>
          <span className="cp-file-uploader__hint">Arraste ficheiros para aqui ou clique para procurar</span>
        </label>
        {files.length > 0 && (
          <ul className="cp-file-uploader__list">
            {files.map((file, index) => {
              const oversize = Boolean(maxSizeBytes) && file.size > (maxSizeBytes as number);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className={`cp-file-uploader__item${oversize ? " cp-file-uploader__item--invalid" : ""}`}
                >
                  <span className="cp-file-uploader__item-name">{file.name}</span>
                  <span className="cp-file-uploader__item-size">
                    {oversize ? "Excede o tamanho máximo" : formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    className="cp-file-uploader__item-remove"
                    aria-label={`Remover ${file.name}`}
                    onClick={() => removeAt(index)}
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {(errorText || helperText) && (
        <span className={`cp-field__helper${errorText ? " cp-field__helper--error" : ""}`}>
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}
