import type { Metadata } from "next";

export const metadata: Metadata = { title: "Breakpoints" };

const breakpoints = [
  ["sm", "640px", "Telefones em modo paisagem, tablets pequenos"],
  ["md", "768px", "Tablets"],
  ["lg", "1024px", "Portáteis pequenos, tablets grandes em paisagem"],
  ["xl", "1280px", "Ecrãs de portátil/desktop — largura do contentor padrão"],
  ["2xl", "1440px", "Ecrãs largos — largura do contentor `wide`"],
];

export default function BreakpointsPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Breakpoints</h1>
      <p className="cp-docs-prose__p">
        Cinco pontos de quebra cobrem desde telemóvel a ecrãs largos de escritório de obra. São
        usados em <code className="cp-docs-prose__code">min-width</code> media queries (abordagem
        mobile-first): o estilo base aplica-se ao ecrã mais pequeno, e cada breakpoint acrescenta
        ajustes para telas maiores.
      </p>

      <table className="cp-docs-prose__table">
        <thead><tr><th>Token</th><th>Valor</th><th>Contexto tipico</th></tr></thead>
        <tbody>
          {breakpoints.map(([token, valor, contexto]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">breakpoint.{token}</code></td>
              <td>{valor}</td>
              <td>{contexto}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Uso recomendado</h2>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`.painel {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .painel {
    grid-template-columns: 280px 1fr;
  }
}`}</code>
      </pre>

      <h2 className="cp-docs-prose__h2">Prioridade do produto Construct+</h2>
      <p className="cp-docs-prose__p">
        O produto é usado principalmente em <strong>desktop/portátil no escritório</strong> e{" "}
        <strong>tablet em contexto de obra</strong> — o telefone é secundário para os fluxos de
        gestão mais densos (orçamentos, tabelas), mas é o principal para registos rápidos em
        campo (fotos, checklists de pós-venda). Desenhe primeiro para <code className="cp-docs-prose__code">md</code>{" "}
        (tablet) e <code className="cp-docs-prose__code">xl</code> (desktop); trate o layout de
        telefone como uma simplificação do de tablet, não o inverso.
      </p>
    </article>
  );
}
