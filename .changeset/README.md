# Changesets

Este diretório é gerido pelo [Changesets](https://github.com/changesets/changesets) — a
ferramenta que versiona e publica os pacotes `@constructpluseu/*` deste monorepo.

Fluxo resumido (ver o guia completo em `CONTRIBUTING.md`):

1. Depois de alterar `packages/react`, `packages/vue`, `packages/angular` ou `packages/tokens`,
   corra `pnpm changeset` e responda às perguntas (quais pacotes mudaram, que tipo de mudança —
   patch/minor/major — e uma descrição curta para o changelog).
2. Faça commit do ficheiro gerado em `.changeset/` junto com as suas alterações.
3. Ao fazer merge para `main`, o GitHub Actions abre automaticamente um PR "Version Packages"
   com as versões atualizadas; ao fazer merge desse PR, os pacotes são publicados
   automaticamente no GitHub Packages.
