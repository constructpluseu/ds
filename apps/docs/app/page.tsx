import Link from "next/link";
import { componentRegistry } from "@/lib/component-registry";

export default function HomePage() {
  const disponiveis = componentRegistry.filter((c) => c.status === "disponivel").length;

  return (
    <article>
      <h1 className="cp-docs-prose__h1">Construct+ Design System</h1>
      <p className="cp-docs-prose__p">
        O sistema de design oficial da Construct Plus: uma linguagem visual e um conjunto de
        componentes partilhados para construir produtos consistentes, acessíveis e rápidos de
        implementar em React, Vue, Angular e Next.js.
      </p>
      <p className="cp-docs-prose__p">
        {disponiveis} de {componentRegistry.length} componentes previstos já estão disponíveis
        nesta fase. Os restantes aparecem na navegação como <em>planeados</em> e serão
        implementados em fases seguintes, mantendo a mesma estrutura de documentação.
      </p>

      <h2 className="cp-docs-prose__h2">Como começar</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Fundamentos</strong> — cor, tipografia, espaçamento, grid, ícones, motion,
          elevação, temas e breakpoints. A base sobre a qual todos os componentes são construídos.
        </li>
        <li>
          <strong>Componentes</strong> — peças de interface reutilizáveis, documentadas com
          anatomia, variantes, estados, conteúdo, acessibilidade e código nos 4 frameworks.
        </li>
        <li>
          <strong>Padrões</strong> — composições de vários componentes que resolvem objetivos
          recorrentes (formulários, estados vazios, notificações, diálogos).
        </li>
        <li>
          <strong>Diretrizes</strong> — regras transversais de acessibilidade, tom de voz,
          temas e responsividade que se aplicam a todo o sistema.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Instalação</h2>
      <p className="cp-docs-prose__p">
        Os pacotes vivem neste monorepo sob <code className="cp-docs-prose__code">@constructpluseu/*</code> e são
        consumidos via workspace. Ver a página de cada componente para exemplos de importação em
        React, Vue, Angular e Next.js.
      </p>

      <Link href="/componentes" className="cp-docs-index-card" style={{ maxWidth: 320 }}>
        <span className="cp-docs-index-card__title">Explorar componentes →</span>
        <span className="cp-docs-index-card__desc">
          Ver a lista completa, com estado de disponibilidade de cada um.
        </span>
      </Link>
    </article>
  );
}
