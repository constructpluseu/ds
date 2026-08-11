import type { Metadata } from "next";

export const metadata: Metadata = { title: "Grid e layout" };

export default function GridELayoutPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Grid e layout</h1>
      <p className="cp-docs-prose__p">
        O layout da plataforma Construct+ assenta num contentor centrado de largura máxima, com
        colunas flexíveis geridas via CSS Grid/Flexbox — não um grid rígido de 12 colunas fixas.
        Esta escolha reflete a natureza dos ecrãs do produto (painéis, formulários, tabelas), que
        beneficiam mais de larguras de coluna adaptativas do que de uma grelha decorativa.
      </p>

      <h2 className="cp-docs-prose__h2">Contentor</h2>
      <ul className="cp-docs-prose__ul">
        <li><code className="cp-docs-prose__code">.cp-container</code> — largura máxima de <strong>1280px</strong>, centrado, com padding horizontal de <code className="cp-docs-prose__code">space-6</code>.</li>
        <li><code className="cp-docs-prose__code">.cp-container--wide</code> — largura máxima de <strong>1440px</strong>, para painéis densos (ex.: tabelas largas, dashboards).</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Composição de layout</h2>
      <p className="cp-docs-prose__p">
        Para grelhas de cartões (ex.: lista de obras, módulos), use <code className="cp-docs-prose__code">display: grid</code>{" "}
        com colunas responsivas via <code className="cp-docs-prose__code">repeat(auto-fill, minmax(...))</code>, evitando
        breakpoints manuais sempre que o conteúdo permitir reflow automático.
      </p>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`.grelha-de-obras {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--cp-space-4);
}`}</code>
      </pre>

      <h2 className="cp-docs-prose__h2">Painel de navegação + conteúdo</h2>
      <p className="cp-docs-prose__p">
        O padrão de layout de aplicação (sidebar fixa + área de conteúdo, visível neste próprio
        site de documentação) usa uma grelha de duas colunas de largura fixa/flexível:
      </p>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}`}</code>
      </pre>
      <p className="cp-docs-prose__p">
        Este padrão será formalizado como o componente <strong>Navegação (Shell)</strong>{" "}
        numa fase seguinte.
      </p>

      <h2 className="cp-docs-prose__h2">Princípios</h2>
      <ul className="cp-docs-prose__ul">
        <li>Nunca fixe larguras em pixels para conteúdo de texto — use <code className="cp-docs-prose__code">max-width</code> em unidades relativas (`ch`, `rem`) para manter linhas legíveis.</li>
        <li>Prefira `gap` a margens para espaçar itens de grelha/flex.</li>
        <li>Veja também <strong>Breakpoints</strong> para os pontos de quebra usados em conjunto com este sistema de layout.</li>
      </ul>
    </article>
  );
}
