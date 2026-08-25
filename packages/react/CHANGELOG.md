# @constructpluseu/react

## 1.1.0

### Minor Changes

- a7f90d0: Adiciona um callback/evento `onNavigate` (React) / `navigate` (Vue, Angular) opcional ao `SideNav`,
  chamado ao clicar num item folha antes da navegação nativa do `<a>`. Chamar
  `event.preventDefault()` cancela o `href`, permitindo integrar um router client-side (React
  Router, Next.js `useRouter`, Vue Router, Angular `Router`) ou validar permissões antes de navegar
  — sem precisar de substituir os `<a>` internos do componente por um adaptador externo. `href`
  continua a ser obrigatório e a navegação por defeito (sem handler) mantém-se inalterada — mudança
  aditiva e retrocompatível.

### Patch Changes

- Updated dependencies [2c707f7]
- Updated dependencies [a7f90d0]
  - @constructpluseu/tokens@1.1.0

## 1.0.0

### Major Changes

- 736b7dd: Primeiro release estável do Construct+ Design System (1.0.0).
  
  Todos os ~34 componentes previstos (Fundamentos, Componentes, Padrões e Diretrizes) estão
  implementados e documentados em React, Vue e Angular, com paridade visual garantida por um
  único CSS partilhado (`@constructpluseu/tokens`). Inclui:
  
  - Design tokens completos (cor, tipografia, espaçamento, raio, sombra, motion, breakpoints),
    com tema claro/escuro via `data-theme`.
  - Sistema de cor auditado para contraste WCAG 2.1 AA (4.5:1) em todas as combinações
    texto/fundo usadas pelos componentes.
  - Suporte a Next.js (App Router) através do pacote `@constructpluseu/react`.

### Patch Changes

- Updated dependencies [736b7dd]
  - @constructpluseu/tokens@1.0.0
