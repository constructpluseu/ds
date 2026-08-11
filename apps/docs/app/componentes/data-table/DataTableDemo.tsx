"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@constructpluseu/react";
import type { DataTableColumn, SortDirection } from "@constructpluseu/react";

const columns: DataTableColumn[] = [
  { key: "obra", header: "Obra", sortable: true },
  { key: "cliente", header: "Cliente", sortable: true },
  { key: "orcamento", header: "Orçamento", sortable: true, align: "end" },
];

const dadosBase = [
  { id: "1", obra: "Reabilitação Rua Nova", cliente: "Condomínio Rua Nova", orcamento: 120000 },
  { id: "2", obra: "Moradia Cascais", cliente: "Família Oliveira", orcamento: 340000 },
  { id: "3", obra: "Armazém Loures", cliente: "Logisplus Lda.", orcamento: 512000 },
  { id: "4", obra: "Escritórios Parque das Nações", cliente: "Officecorp SA", orcamento: 275000 },
];

function formatEuro(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DataTableDemo() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const rows = useMemo(() => {
    if (!sortKey || !sortDirection) return dadosBase;
    return [...dadosBase].sort((a, b) => {
      const av = a[sortKey as keyof typeof a];
      const bv = b[sortKey as keyof typeof b];
      const result =
        typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), "pt-PT");
      return sortDirection === "asc" ? result : -result;
    });
  }, [sortKey, sortDirection]);

  return (
    <div>
      <DataTable
        caption="Lista de obras em curso"
        columns={columns}
        rows={rows}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={(key, direction) => {
          setSortKey(direction ? key : null);
          setSortDirection(direction);
        }}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        renderCell={(row, column) =>
          column.key === "orcamento" ? formatEuro(row.orcamento as number) : (row[column.key] as string)
        }
      />
      <p style={{ marginTop: "var(--cp-space-2)", fontSize: "var(--cp-font-size-sm)", color: "var(--cp-color-semantic-text-secondary)" }}>
        {selectedKeys.length} obra(s) selecionada(s)
      </p>
    </div>
  );
}
