/**
 * Regras desativadas porque testam estrutura de página inteira (<html lang>, <title>,
 * landmarks, regiões) — não fazem sentido ao auditar um componente isolado montado em jsdom
 * sem documento à volta. Mesmo conjunto usado nos testes de axe-core dos pacotes react e vue,
 * para manter o comportamento consistente entre os 3 frameworks.
 */
export const COMPONENT_TEST_RULES = {
  "html-has-lang": { enabled: false },
  "document-title": { enabled: false },
  "landmark-one-main": { enabled: false },
  "page-has-heading-one": { enabled: false },
  region: { enabled: false },
};
