import { run } from "axe-core";
import { expect } from "vitest";

/**
 * Regras desativadas porque testam estrutura de página inteira (<html lang>, <title>,
 * landmarks, regiões) — não fazem sentido ao auditar um componente isolado montado em jsdom
 * sem documento à volta. Mesmo conjunto que jest-axe/vitest-axe recomendam desativar em testes
 * de componente. Ver https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter.
 */
const COMPONENT_TEST_RULES = {
  "html-has-lang": { enabled: false },
  "document-title": { enabled: false },
  "landmark-one-main": { enabled: false },
  "page-has-heading-one": { enabled: false },
  region: { enabled: false },
};

export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await run(container, { rules: COMPONENT_TEST_RULES });
  if (results.violations.length === 0) return;

  const details = results.violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => `  - ${node.target.join(" ")}`).join("\n");
      return `${violation.id} (${violation.impact}): ${violation.help}\n${targets}`;
    })
    .join("\n\n");

  expect.fail(`Violações de acessibilidade (axe-core):\n\n${details}`);
}
