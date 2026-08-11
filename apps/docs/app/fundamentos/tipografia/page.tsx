import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tipografia" };

const tamanhos = [
  ["xs", "0.75rem / 12px", "Legendas, metadados"],
  ["sm", "0.875rem / 14px", "Texto de ajuda, rótulos secundários"],
  ["md", "1rem / 16px", "Corpo de texto, predefinição de campos"],
  ["lg", "1.125rem / 18px", "Parágrafo de destaque, títulos de cartão"],
  ["xl", "1.25rem / 20px", "Títulos de secção pequenos"],
  ["2xl", "1.5rem / 24px", "Títulos de secção"],
  ["3xl", "1.875rem / 30px", "Títulos de página pequenos"],
  ["4xl", "2.25rem / 36px", "Títulos de página"],
  ["5xl", "3rem / 48px", "Hero de marketing"],
  ["6xl", "3.75rem / 60px", "Ecrãs de destaque"],
  ["7xl", "4.5rem / 72px", "Ecrãs de destaque, uso raro"],
] as const;

const pesos = [
  ["regular", "400", "Corpo de texto"],
  ["medium", "500", "Rótulos, texto de ajuste fino"],
  ["semibold", "600", "Títulos de cartão, separadores ativos, botões"],
  ["bold", "700", "Títulos de secção"],
  ["extrabold", "800", "Títulos de página, hero"],
] as const;

const alturas = [
  { token: "tight", valor: "1.2", uso: "Títulos" },
  { token: "normal", valor: "1.5", uso: "Corpo de texto, controlos de formulário" },
  { token: "relaxed", valor: "1.625", uso: "Parágrafos longos e descrições, para conforto de leitura" },
] as const;

const textoExemplo =
  "A gestão de obras exige clareza em cada relatório e em cada orçamento partilhado com a equipa.";

export default function TipografiaPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Tipografia</h1>
      <p className="cp-docs-prose__p">
        Uma única família tipográfica é usada em toda a plataforma Construct+:{" "}
        <strong>Inter</strong>. É uma fonte sans-serif desenhada para interfaces digitais, com
        excelente legibilidade em tamanhos pequenos e uma gama ampla de pesos — dispensa uma
        segunda fonte para títulos, a hierarquia visual vem do tamanho e do peso.
      </p>

      <h2 className="cp-docs-prose__h2">Família e pilha de fontes</h2>
      <p className="cp-docs-prose__p">
        <code className="cp-docs-prose__code">--cp-font-family-base</code>:{" "}
        <code className="cp-docs-prose__code">Inter, &apos;Segoe UI&apos;, system-ui, -apple-system, sans-serif</code>
      </p>
      <p className="cp-docs-prose__p">
        Existe também uma pilha monoespaçada (<code className="cp-docs-prose__code">--cp-font-family-mono</code>)
        reservada para blocos de código na documentação e para futuros componentes como{" "}
        <em>Code Snippet</em>.
      </p>

      <h2 className="cp-docs-prose__h2">Escala de tamanhos</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr><th>Token</th><th>Valor</th><th>Uso típico</th><th>Exemplo</th></tr>
        </thead>
        <tbody>
          {tamanhos.map(([token, valor, uso]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">font-size-{token}</code></td>
              <td style={{ whiteSpace: "nowrap" }}>{valor}</td>
              <td>{uso}</td>
              <td>
                <span style={{ fontSize: `var(--cp-font-size-${token})`, color: "var(--cp-color-semantic-text-primary)", lineHeight: 1 }}>
                  Aa Obra
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Pesos</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr><th>Token</th><th>Valor</th><th>Uso típico</th><th>Exemplo</th></tr>
        </thead>
        <tbody>
          {pesos.map(([token, valor, uso]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">font-weight-{token}</code></td>
              <td>{valor}</td>
              <td>{uso}</td>
              <td>
                <span style={{ fontWeight: `var(--cp-font-weight-${token})`, fontSize: "var(--cp-font-size-lg)", color: "var(--cp-color-semantic-text-primary)" }}>
                  Aa Obra
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Altura de linha</h2>
      <p className="cp-docs-prose__p">
        O mesmo texto, com cada uma das três alturas de linha aplicada — repare no espaço vertical
        entre a primeira e a segunda linha em cada caixa.
      </p>
      <div style={{ display: "grid", gap: "var(--cp-space-4)", marginBottom: "var(--cp-space-6)" }}>
        {alturas.map((altura) => (
          <div
            key={altura.token}
            style={{
              border: "1px solid var(--cp-color-semantic-border-default)",
              borderRadius: "var(--cp-radius-lg)",
              padding: "var(--cp-space-4)",
              backgroundColor: "var(--cp-color-semantic-bg-surface)",
            }}
          >
            <p
              style={{
                marginBottom: "var(--cp-space-2)",
                fontSize: "var(--cp-font-size-xs)",
                fontWeight: "var(--cp-font-weight-semibold)",
                color: "var(--cp-color-semantic-text-secondary)",
              }}
            >
              <code className="cp-docs-prose__code">line-height-{altura.token}</code> ({altura.valor}) — {altura.uso}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "var(--cp-font-size-md)",
                lineHeight: altura.valor,
                color: "var(--cp-color-semantic-text-primary)",
                maxWidth: "32rem",
              }}
            >
              {textoExemplo}
            </p>
          </div>
        ))}
      </div>

      <h2 className="cp-docs-prose__h2">Princípios de uso</h2>
      <ul className="cp-docs-prose__ul">
        <li>Nunca salte mais de um nível de título (h1 → h2 → h3) só por efeito visual — a hierarquia semântica deve corresponder à hierarquia visual.</li>
        <li>Use no máximo 2-3 tamanhos de tipo por ecrã; a maioria da hierarquia consegue-se com peso, não com tamanho.</li>
        <li>Texto de corpo nunca deve ser inferior a <code className="cp-docs-prose__code">font-size-sm</code> (14px) para manter a legibilidade em ecrãs de obra/campo.</li>
      </ul>
    </article>
  );
}
