"use client";

import { useState } from "react";
import { TreeView } from "@constructpluseu/react";
import type { TreeNode } from "@constructpluseu/react";

const nodes: TreeNode[] = [
  {
    id: "obras-em-curso",
    label: "Obras em curso",
    children: [
      {
        id: "residencial",
        label: "Residencial",
        children: [
          { id: "moradia-cascais", label: "Moradia Cascais" },
          { id: "reabilitacao-rua-nova", label: "Reabilitação Rua Nova" },
        ],
      },
      { id: "comercial", label: "Escritórios Parque das Nações" },
    ],
  },
  {
    id: "arquivo",
    label: "Arquivo",
    children: [{ id: "armazem-loures-2024", label: "Armazém Loures (2024)" }],
  },
];

export function TreeViewDemo() {
  const [expandedIds, setExpandedIds] = useState<string[]>(["obras-em-curso"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <TreeView
      label="Estrutura de obras"
      nodes={nodes}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
}
