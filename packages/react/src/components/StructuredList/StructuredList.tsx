import type { ReactNode } from "react";

export interface StructuredListProps {
  headers: string[];
  rows: ReactNode[][];
  "aria-label"?: string;
}

export function StructuredList({ headers, rows, "aria-label": ariaLabel }: StructuredListProps) {
  return (
    <table className="cp-structured-list" aria-label={ariaLabel}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
