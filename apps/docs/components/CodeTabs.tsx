"use client";

import { useState } from "react";

export interface CodeTabsProps {
  tabs: {
    label: "React" | "Vue" | "Angular" | "Next.js";
    code: string;
  }[];
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="cp-docs-codetabs">
      <div className="cp-docs-codetabs__tablist" role="tablist" aria-label="Exemplo de código por framework">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={index === active}
            className="cp-docs-codetabs__tab"
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="cp-docs-codetabs__panel" role="tabpanel">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
