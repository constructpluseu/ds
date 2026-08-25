# Construct+ Design System

Design system oficial da Construct Plus: fundações de design (tokens), componentes de interface
e diretrizes de conteúdo/acessibilidade, implementados de forma consistente em **React**, **Vue**,
**Angular** e **Next.js**.

## Estrutura do monorepo

```
V2/
├── packages/
│   ├── tokens/      @constructpluseu/tokens   — tokens de design (JSON fonte → CSS/SCSS/JS)
│   ├── react/       @constructpluseu/react    — componentes React
│   ├── vue/         @constructpluseu/vue      — componentes Vue 3
│   └── angular/     @constructpluseu/angular  — componentes Angular (standalone)
└── apps/
    ├── docs/          site de documentação (Next.js + MDX) — http://localhost:3100/DS
    └── nextjs-demo/   app de exemplo consumindo @constructpluseu/react — http://localhost:3000
```

`apps/docs` corre com `basePath: "/DS"` (ver `apps/docs/next.config.*`) — em desenvolvimento, a raiz
`http://localhost:3100/` dá 404; a aplicação só existe sob `http://localhost:3100/DS`.

## Requisitos

- Node.js ≥ 22
- pnpm (via `corepack enable`, ou `npm install -g pnpm`)

## Como começar

```bash
pnpm install
pnpm build   # builda tokens → react/vue/angular → apps, pela ordem correta (via Turborepo)
pnpm dev     # arranca as apps em modo desenvolvimento
pnpm test    # corre os testes de todos os pacotes
pnpm lint    # corre o ESLint de todos os pacotes
```

Para trabalhar só em `apps/docs`, use o comando dedicado — builda `tokens` e `react` uma vez
(gera `dist/css/*.css` e `dist/styles.css`, dos quais `apps/docs` depende) e só depois arranca os
três em modo watch:

```bash
pnpm dev:docs   # → http://localhost:3100/DS
```

`pnpm --filter docs dev` sozinho **não** é auto-suficiente: `apps/docs` importa
`@constructpluseu/react/styles.css`, que só existe depois de `packages/react` ter sido buildado
pelo menos uma vez. Sem esse build prévio (via `pnpm build` ou `pnpm dev:docs`), o `next dev`
falha a resolver o import. Use `pnpm --filter docs dev` apenas depois de já ter corrido `pnpm build`
ou `pnpm dev:docs` nesta sessão.

Para trabalhar noutro pacote específico (depois de `pnpm build` ter corrido pelo menos uma vez):

```bash
pnpm --filter @constructpluseu/react dev
```

## Estado atual

Os ~34 componentes previstos (Fundamentos, Componentes, Padrões e Diretrizes) estão implementados
e documentados nos 4 alvos — React, Vue, Angular e Next.js.

Ver `apps/docs` para a documentação completa de fundamentos, componentes, padrões e diretrizes.

## Instalar os pacotes numa aplicação

Os pacotes são publicados no GitHub Packages a cada merge para `main` (ver
[`.github/workflows/release.yml`](./.github/workflows/release.yml)). Para consumir o design
system numa aplicação **fora** deste monorepo, siga o
**[Guia de instalação](./GUIA-DE-INSTALACAO.md)** — cobre autenticação, instalação e um exemplo
de uso para cada framework, pensado para quem nunca usou o design system antes.

Dentro deste monorepo, os pacotes continuam a ser consumidos via workspace
(`"@constructpluseu/react": "workspace:*"`) — não é preciso publicar nada para desenvolver aqui.

## Convenções

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para a convenção de nomenclatura de ficheiros por
componente e o processo para adicionar um novo componente.
