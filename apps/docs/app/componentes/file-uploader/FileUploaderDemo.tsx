"use client";

import { useState } from "react";
import { FileUploader } from "@constructpluseu/react";

export function FileUploaderDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploader
      label="Plantas e comprovativos"
      files={files}
      onChange={setFiles}
      multiple
      accept=".pdf,.jpg,.jpeg,.png"
      maxSizeBytes={5 * 1024 * 1024}
      helperText="PDF, JPG ou PNG, até 5 MB por ficheiro."
    />
  );
}
