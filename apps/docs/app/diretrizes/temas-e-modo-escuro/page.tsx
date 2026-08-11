import type { Metadata } from "next";

export const metadata: Metadata = { title: "Temas e modo escuro" };

export default function TemasEModoEscuroPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Temas e modo escuro</h1>
      <p className="cp-docs-prose__p">
        Esta diretriz complementa <strong>Fundamentos → Temas</strong> com recomendações práticas
        de implementação por framework, para evitar os dois problemas mais comuns ao adicionar
        modo escuro a uma aplicação: <em>flash do tema errado</em> ao carregar a página, e{" "}
        <em>inconsistência</em> entre o tema escolhido e o realmente aplicado após recarregar.

      </p>

      <h2 className="cp-docs-prose__h2">Regra de ouro</h2>
      <p className="cp-docs-prose__p">
        O atributo <code className="cp-docs-prose__code">data-theme</code> deve ser aplicado ao{" "}
        <code className="cp-docs-prose__code">&lt;html&gt;</code>{" "}
        <strong>antes da primeira pintura</strong> da página — nunca apenas num `useEffect`/`onMounted`
        que corre depois da hidratação, ou o utilizador verá um flash do tema errado.
      </p>

      <h2 className="cp-docs-prose__h2">Next.js (App Router)</h2>
      <p className="cp-docs-prose__p">
        Defina o tema predefinido diretamente no <code className="cp-docs-prose__code">layout.tsx</code>{" "}
        do servidor; se precisar de persistir a escolha do utilizador entre visitas, use um
        pequeno script inline no <code className="cp-docs-prose__code">&lt;head&gt;</code> que lê{" "}
        <code className="cp-docs-prose__code">localStorage</code> antes da hidratação do React —
        este é o mesmo padrão usado por praticamente todas as bibliotecas de tema para Next.js.
      </p>

      <h2 className="cp-docs-prose__h2">Vue / Vite (SPA)</h2>
      <p className="cp-docs-prose__p">
        Como não há SSR a considerar, é seguro aplicar o tema num pequeno script síncrono no{" "}
        <code className="cp-docs-prose__code">index.html</code>, antes do bundle da aplicação
        carregar, lendo a preferência de <code className="cp-docs-prose__code">localStorage</code>.
      </p>

      <h2 className="cp-docs-prose__h2">Angular</h2>
      <p className="cp-docs-prose__p">
        Aplique o atributo o mais cedo possível — idealmente também via um script inline no{" "}
        <code className="cp-docs-prose__code">index.html</code>, já que o bootstrap do Angular
        (mesmo com hidratação SSR) tem um custo de arranque maior que o suficiente para tornar um
        flash de tema visível se a troca só ocorrer depois de o `AppComponent` inicializar.
      </p>

      <h2 className="cp-docs-prose__h2">Respeitar a preferência do sistema operativo</h2>
      <p className="cp-docs-prose__p">
        Quando o utilizador ainda não escolheu explicitamente um tema, é boa prática usar a
        media query <code className="cp-docs-prose__code">prefers-color-scheme</code> do sistema
        operativo como predefinição, e só sobrepor com a escolha manual quando existir uma
        preferência guardada.
      </p>

      <h2 className="cp-docs-prose__h2">Não crie um terceiro tema sem necessidade real</h2>
      <p className="cp-docs-prose__p">
        O design system suporta apenas claro/escuro nesta fase. Um tema de <em>alto contraste</em>{" "}
        dedicado não está planeado a curto prazo — se surgir um requisito de acessibilidade
        específico nesse sentido, deve ser tratado como uma extensão formal do sistema de tokens,
        não como um ajuste ad-hoc de CSS numa aplicação individual.
      </p>
    </article>
  );
}
