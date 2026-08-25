# @constructpluseu/tokens

## 1.1.0

### Minor Changes

- a7f90d0: Introduz uma escala real de raio de canto: `sm`/`md`/`lg`/`xl`/`2xl`/`3xl` deixam de ser todos
  iguais a `0.3125rem` (5px) — cada um passa a ter um valor distinto (`4px`/`6px`/`10px`/`16px`/
  `20px`/`24px`), dando hierarquia visual real entre superfícies pequenas (checkbox, badges),
  médias (inputs, menus) e grandes (cartões, modais, botões). `none` e `full` mantêm-se
  inalterados. Como a esmagadora maioria dos componentes já referenciava o token semanticamente
  correto para a sua escala (ex.: `checkbox` em `sm`, `card`/`modal`/`button` em `xl`), este é
  principalmente um ajuste de valores — não de que token cada componente usa — mas é uma mudança
  visual visível em todos os consumidores, por isso versionado como `minor`.

### Patch Changes

- 2c707f7: Corrige referências a `--cp-color-semantic-accent-default`/`-hover`, usadas em 6 sítios
  (DataTable, DatePicker, FileUploader, SideNav e a navegação ativa do site de documentação) sem
  nunca terem sido declaradas como token — o motor CSS descartava-as silenciosamente, deixando o
  resultado dependente de herança (nomeadamente `color`, por ser uma propriedade herdada).
  
  O problema real era uma lacuna na taxonomia: `bg.accent`/`-hover`/`-active` (para preenchimentos)
  já existiam, mas não havia equivalente para usar o acento como cor de primeiro plano (texto,
  ícone, borda). Adiciona `text.accent`, `icon.accent` e `border.accent` (claro: `mint.900`/
  `mint.500`, mesmo padrão de contraste de `text.success`/`border.focus`; escuro: `mint.300`/
  `mint.400`) e atualiza cada um dos 6 usos para o token correto — os que precisavam de
  preenchimento passam a usar `bg.accent`/`bg.accent-hover` já existentes, os que precisavam de
  primeiro plano usam os três tokens novos.
  
  Corrige também o aviso do Style Dictionary "filtered out token references" emitido ao gerar
  `tokens-dark.css`: o build do tema escuro filtra para só emitir tokens `color.semantic.*`, mas
  `outputReferences: true` continuava a gerar `var(--cp-color-base-*)` para referências a tokens de
  base excluídos desse ficheiro — funcionava por acaso, só porque `tokens-dark.css` é sempre
  concatenado a seguir a `tokens-light.css` (que já declara essas variáveis) e nenhum token de base
  ainda difere entre temas. Passa a usar `outputReferencesFilter` (utilitário oficial do Style
  Dictionary para este cenário), que resolve para o valor literal qualquer referência a um token
  filtrado — `tokens-dark.css` fica correto e autocontido mesmo se importado isoladamente.

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
