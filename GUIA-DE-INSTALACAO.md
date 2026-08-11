# Guia de instalação — Construct+ Design System

Este guia explica, passo a passo, como usar o Construct+ Design System num projeto **fora**
deste monorepo (React, Vue, Angular ou Next.js). Está escrito para quem está a usar o design
system por PRIMEIRA vez — não é preciso conhecer o código-fonte do design system para o seguir.

> Não encontra aqui a explicação de um componente específico (props, variantes, acessibilidade)?
> Isso está na documentação completa: **https://constructplus.eu/DS/**

## Índice

1. [Como funciona a distribuição](#1-como-funciona-a-distribuição)
2. [Pré-requisito único: autenticar no GitHub Packages](#2-pré-requisito-único-autenticar-no-github-packages)
3. [Instalar e usar em React](#3-instalar-e-usar-em-react)
4. [Instalar e usar em Next.js](#4-instalar-e-usar-em-nextjs)
5. [Instalar e usar em Vue 3](#5-instalar-e-usar-em-vue-3)
6. [Instalar e usar em Angular](#6-instalar-e-usar-em-angular)
7. [Tema claro/escuro](#7-tema-claroescuro)
8. [Como atualizar para uma versão nova](#8-como-atualizar-para-uma-versão-nova)
9. [Resolução de problemas comuns](#9-resolução-de-problemas-comuns)

---

## 1. Como funciona a distribuição

O design system é publicado como pacotes npm normais, com um pacote por framework:

| Pacote | Framework |
|---|---|
| `@constructpluseu/react` | React (usar também em apps Next.js) |
| `@constructpluseu/vue` | Vue 3 |
| `@constructpluseu/angular` | Angular 18+ |
| `@constructpluseu/tokens` | Só as variáveis de cor/espaçamento/tipografia em CSS puro (raramente precisa de instalar isto à parte — cada pacote acima já inclui o CSS compilado) |

Cada vez que alguém da equipa do design system publica uma nova versão (o pipeline de CI/CD faz
isto automaticamente ao mesclar para `main`), essa versão fica disponível para instalar como
qualquer outra dependência do seu `package.json`. **Não há nenhum passo manual de "build do
design system"** do seu lado — você só instala a versão que quer e usa.

## 2. Pré-requisito único: autenticar no GitHub Packages

Os pacotes estão publicados no **GitHub Packages** (um registo privado, ligado ao repositório da
empresa), não no npm público. Isto significa que, mesmo para instalar, é preciso um token —
mas isto só precisa de ser configurado **uma vez por máquina/pipeline**, não a cada instalação.

### 2.1. Gerar um token de acesso (uma vez)

1. No GitHub, vá a **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Gere um novo token com o scope **`read:packages`** (não precisa de mais nenhum scope só para
   instalar).
3. Copie o token — só é mostrado uma vez.

### 2.2. Configurar o `.npmrc` do seu projeto

Na **raiz do seu projeto** (o que está a consumir o design system, não o design system em si),
crie ou edite o ficheiro `.npmrc`:

```ini
@constructpluseu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

E defina a variável de ambiente `GITHUB_TOKEN` com o valor do token gerado no passo anterior —
**nunca cole o token diretamente no ficheiro `.npmrc`** se esse ficheiro for para o repositório
(ele já está preparado para ler de uma variável de ambiente):

```bash
# Linux/macOS — adicionar ao seu ~/.bashrc, ~/.zshrc, ou ao ficheiro .env do projeto
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Windows (PowerShell) — definir permanentemente para o seu utilizador
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxx"
```

No **pipeline de CI/CD** onde a sua aplicação faz deploy, defina `GITHUB_TOKEN` como uma
variável/secret do próprio pipeline (GitHub Actions já fornece um `GITHUB_TOKEN` automático com
permissão de leitura de pacotes do mesmo repositório/organização — para a maioria dos casos não
precisa nem de criar um token novo, basta usar `${{ secrets.GITHUB_TOKEN }}`).

> **Nota para quem usa Vercel, Netlify ou outra plataforma de deploy**: adicione `GITHUB_TOKEN`
> como variável de ambiente nas configurações do projeto dessa plataforma — o mesmo `.npmrc`
> acima funciona lá também, porque essas plataformas correm `npm install`/`pnpm install` durante
> o build.

## 3. Instalar e usar em React

```bash
npm install @constructpluseu/react react react-dom
```

Importe o CSS **uma única vez**, o mais perto possível da raiz da aplicação (ex.: `main.tsx`,
`index.tsx` ou `App.tsx`):

```tsx
import "@constructpluseu/react/styles.css";
```

Exemplo de uso:

```tsx
import { Button, Card } from "@constructpluseu/react";

function ObraCard() {
  return (
    <Card>
      <h2>Reabilitação Rua Nova</h2>
      <p>Orçamento: 120 000 €</p>
      <Button variant="primary" onClick={() => console.log("guardado")}>
        Guardar obra
      </Button>
    </Card>
  );
}
```

## 4. Instalar e usar em Next.js

O Next.js consome o **mesmo pacote `@constructpluseu/react`** — não existe um pacote
`@constructpluseu/nextjs` separado.

```bash
npm install @constructpluseu/react react react-dom
```

Importe o CSS uma vez no layout raiz (`app/layout.tsx`, App Router):

```tsx
import "@constructpluseu/react/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

**Regra importante do App Router**: se você vai passar uma função (`onClick`, `onChange`, etc.)
para um componente do design system dentro de uma página que é *Server Component* por padrão,
crie um pequeno *wrapper* marcado com `"use client"`:

```tsx
// app/obras/BotaoGuardar.tsx
"use client";

import { Button } from "@constructpluseu/react";

export function BotaoGuardar() {
  return <Button onClick={() => alert("Guardado!")}>Guardar obra</Button>;
}
```

```tsx
// app/obras/page.tsx (Server Component, sem "use client")
import { BotaoGuardar } from "./BotaoGuardar";

export default function ObrasPage() {
  return (
    <div>
      <h1>Obras</h1>
      <BotaoGuardar />
    </div>
  );
}
```

Se pular este passo e passar a função diretamente do Server Component, o build do Next.js falha
(ou trava) sem uma mensagem de erro clara — é o problema mais comum de quem começa a usar o
design system no App Router.

## 5. Instalar e usar em Vue 3

```bash
npm install @constructpluseu/vue vue
```

Importe o CSS uma vez no ficheiro de entrada da aplicação (`main.ts`):

```ts
import { createApp } from "vue";
import "@constructpluseu/vue/styles.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

Exemplo de uso:

```vue
<script setup lang="ts">
import { CpButton, CpCard } from "@constructpluseu/vue";
</script>

<template>
  <CpCard>
    <h2>Reabilitação Rua Nova</h2>
    <p>Orçamento: 120 000 €</p>
    <CpButton variant="primary" @click="() => console.log('guardado')">
      Guardar obra
    </CpButton>
  </CpCard>
</template>
```

## 6. Instalar e usar em Angular

```bash
npm install @constructpluseu/angular @angular/common @angular/core rxjs
```

Adicione o CSS ao `angular.json` do seu projeto (dentro de `projects.<nome>.architect.build.options.styles`):

```json
"styles": [
  "node_modules/@constructpluseu/angular/styles.css",
  "src/styles.css"
]
```

Exemplo de uso (componente standalone):

```ts
import { Component } from "@angular/core";
import { CpButtonComponent, CpCardComponent } from "@constructpluseu/angular";

@Component({
  selector: "app-obra-card",
  standalone: true,
  imports: [CpButtonComponent, CpCardComponent],
  template: `
    <cp-card>
      <h2>Reabilitação Rua Nova</h2>
      <p>Orçamento: 120 000 €</p>
      <cp-button variant="primary" (click)="guardar()">Guardar obra</cp-button>
    </cp-card>
  `,
})
export class ObraCardComponent {
  guardar() {
    console.log("guardado");
  }
}
```

## 7. Tema claro/escuro

Todos os frameworks partilham o mesmo mecanismo: um atributo `data-theme` no elemento `<html>`.

```html
<html data-theme="light">   <!-- ou data-theme="dark" -->
```

- **Predefinição**: `light`. Se não definir o atributo, o tema claro é usado.
- Para alternar dinamicamente, basta mudar esse atributo via JavaScript
  (`document.documentElement.setAttribute("data-theme", "dark")`) e guardar a preferência do
  utilizador (ex.: em `localStorage`) — o design system não impõe como/onde guardar essa escolha,
  só reage ao atributo.
- Não é preciso importar um CSS diferente para o tema escuro — o mesmo ficheiro `styles.css`
  já contém as regras para os dois temas.

## 8. Como atualizar para uma versão nova

Isto é o objetivo principal desta distribuição: **atualizar o design system não deve ser
diferente de atualizar qualquer outra dependência.**

```bash
# ver a versão instalada atualmente
npm list @constructpluseu/react

# atualizar para a versão mais recente compatível com o intervalo no seu package.json
npm update @constructpluseu/react

# ou, para saltar diretamente para uma versão específica
npm install @constructpluseu/react@2.3.0
```

Depois de atualizar:

1. Corra os seus testes/build locais como faria para qualquer outra dependência.
2. Faça commit do `package.json` e do lockfile atualizados.
3. Faça deploy da sua aplicação como já faz normalmente — não há nenhum passo extra específico
   do design system.

Cada versão publicada segue [versionamento semântico](https://semver.org/lang/pt-BR/):
- **patch** (`1.2.3` → `1.2.4`): correções, sem mudanças de API. Seguro atualizar sempre.
- **minor** (`1.2.3` → `1.3.0`): novos componentes ou props, sem quebrar nada existente.
- **major** (`1.2.3` → `2.0.0`): mudanças que quebram compatibilidade — leia o changelog do
  pacote antes de atualizar (publicado junto com cada release no GitHub).

## 9. Resolução de problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| `401 Unauthorized` ou `404 Not Found` ao instalar | Falta o `.npmrc` com o registo do GitHub Packages, ou o `GITHUB_TOKEN` não está definido/expirou | Repita a secção 2 deste guia |
| Componentes aparecem sem nenhum estilo | Esqueceu de importar `@constructpluseu/{react,vue,angular}/styles.css` | Adicione o import indicado na secção do seu framework |
| Next.js: build falha ou trava sem erro claro numa página com um componente interativo | Passou uma função direto de um Server Component para um componente do design system | Crie um wrapper `"use client"` (ver secção 4) |
| Cores parecem "erradas" só num dos temas | O `data-theme` não está a ser aplicado ao `<html>` (só a um `<div>` interno, por exemplo) | O atributo `data-theme` tem de estar no elemento `<html>`, não num contentor interno |
| `npm update` não traz a versão mais nova | O intervalo de versão no seu `package.json` (ex. `^1.2.3`) não permite a versão nova (ex. é uma major) | Instale explicitamente com `npm install @constructpluseu/react@<versão>` |

Dúvidas que não estão aqui? Consulte a documentação completa em
**https://constructplus.eu/DS/** ou abra uma *issue* no repositório do design system.
