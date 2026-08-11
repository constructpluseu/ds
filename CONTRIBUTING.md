# Contribuir para o Construct+ Design System

## Convenção de nomenclatura por componente

Um slug único em kebab-case amarra as várias implementações de um mesmo componente:

| Local | Convenção | Exemplo (`text-input`) |
|---|---|---|
| CSS partilhado | `packages/tokens/src/components/{slug}.css`, classe `.cp-{slug}` | `text-input.css`, `.cp-text-input` |
| React | `packages/react/src/components/{PascalCase}/` | `TextInput/TextInput.tsx` |
| Vue | `packages/vue/src/components/{PascalCase}/Cp{PascalCase}.vue` | `TextInput/CpTextInput.vue` |
| Angular | `packages/angular/src/lib/{kebab-case}/`, selector `cp-{kebab-case}` | `text-input/text-input.component.ts` |
| Documentação | `apps/docs/app/componentes/{kebab-case}/page.mdx` | `text-input/page.mdx` |
| Registry | `apps/docs/lib/component-registry.ts`, `slug: "text-input"` | — |

## Regra de ouro do CSS

Todo o CSS visual de um componente vive **apenas** em `packages/tokens/src/components/{slug}.css`,
escrito à mão em CSS puro, usando exclusivamente `var(--cp-*)` para cor, espaço, raio, sombra e
motion — nunca valores hardcoded. Os pacotes de framework (React/Vue/Angular) nunca escrevem CSS
de aparência: só compõem as classes certas via props/inputs. Isto garante paridade visual
pixel-a-pixel entre os 3 frameworks, porque é literalmente o mesmo ficheiro CSS.

## Adicionar um novo componente

1. **CSS**: criar `packages/tokens/src/components/{slug}.css`. Rebuildar com
   `pnpm --filter @constructpluseu/tokens build` para incluir no `components.css` gerado.
2. **React**: criar `packages/react/src/components/{PascalCase}/` com o componente, um `index.ts`
   de barrel, e um `.test.tsx` cobrindo variantes, disabled e comportamento de teclado quando
   aplicável. Exportar no `packages/react/src/index.ts`.
3. **Vue**: mesmo padrão em `packages/vue/src/components/{PascalCase}/`, com um `types.ts`
   separado para os tipos (nunca exportar tipos diretamente de um `.vue`).
4. **Angular**: mesmo padrão em `packages/angular/src/lib/{kebab-case}/`, componente standalone,
   selector `cp-{kebab-case}`. Exportar no `packages/angular/src/public-api.ts`.
5. **Documentação**: criar `apps/docs/app/componentes/{slug}/page.mdx` seguindo o esqueleto fixo
   (ver `button/page.mdx` como referência): Resumo → Quando usar/não usar → Anatomia → Variantes
   → Tamanhos → Estados → Comportamento → Conteúdo → Acessibilidade → Código (4 abas) →
   Relacionados. Atualizar o `status` para `"disponivel"` em `apps/docs/lib/component-registry.ts`.
6. Rodar `pnpm build && pnpm test && pnpm lint` na raiz antes de considerar terminado.

## Acessibilidade

Todo componente interativo deve seguir o padrão de teclado do WAI-ARIA Authoring Practices Guide
para o seu papel (ex.: roving tabindex em `Tabs`, `Escape` para fechar em `Modal`). Ver
`apps/docs/app/diretrizes/acessibilidade` para os princípios gerais.

## Testes

- React/Vue: Vitest + Testing Library. Cobrir sempre: renderização base, variantes/props,
  `disabled` bloqueia interação, e comportamento de teclado quando o componente tiver um papel
  ARIA interativo.
- Angular: Jest + `jest-preset-angular`, mesmo critério de cobertura.

## Tom de voz do conteúdo

Toda a documentação e todo o texto de exemplo são escritos em português europeu (pt-PT),
seguindo as regras em `apps/docs/app/diretrizes/conteudo-e-tom-de-voz`.
