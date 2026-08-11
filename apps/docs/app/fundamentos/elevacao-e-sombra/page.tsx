import type { Metadata } from "next";

export const metadata: Metadata = { title: "Elevação e sombra" };

const niveis = [
  ["sm", "0 1px 2px rgba(13,33,55,.06)", "Bordas subtis, separação mínima (ex.: linha de tabela)"],
  ["md", "0 4px 8px rgba(13,33,55,.08)", "Elementos flutuantes de baixo destaque (tooltip)"],
  ["lg", "0 8px 24px rgba(13,33,55,.12)", "Cartões interativos em hover, popovers"],
  ["xl", "0 16px 40px rgba(13,33,55,.16)", "Modais e diálogos"],
];

export default function ElevacaoESombraPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Elevação e sombra</h1>
      <p className="cp-docs-prose__p">
        A elevação comunica hierarquia espacial: quanto mais alto um elemento &ldquo;flutua&rdquo;
        sobre a interface, mais escura e difusa é a sua sombra. O sistema usa uma escala de 4
        níveis genéricos, mais duas sombras temáticas dedicadas.
      </p>

      <h2 className="cp-docs-prose__h2">Escala genérica</h2>
      <table className="cp-docs-prose__table">
        <thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
        <tbody>
          {niveis.map(([token, valor, uso]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">shadow.{token}</code></td>
              <td style={{ fontFamily: "var(--cp-font-family-mono)", fontSize: "var(--cp-font-size-xs)" }}>{valor}</td>
              <td>{uso}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Sombras temáticas</h2>
      <ul className="cp-docs-prose__ul">
        <li><code className="cp-docs-prose__code">shadow.card</code> — sombra suave predefinida do componente <strong>Card</strong>, discreta mesmo em repouso.</li>
        <li><code className="cp-docs-prose__code">shadow.accent</code> — sombra verde (baseada na cor de destaque) usada no <strong>Button</strong> variante <code className="cp-docs-prose__code">accent</code>, para reforçar visualmente a chamada à ação.</li>
        <li><code className="cp-docs-prose__code">shadow.focus-ring</code> — anel de foco suave usado em campos de formulário inválidos/focados, como alternativa ao <code className="cp-docs-prose__code">outline</code> nativo quando um efeito mais integrado é desejado.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Exemplos práticos</h2>
      <p className="cp-docs-prose__p">
        Cada caixa abaixo é um elemento real com o <code className="cp-docs-prose__code">box-shadow</code> do
        token indicado — compare a profundidade percebida entre níveis.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
          gap: "var(--cp-space-8)",
          padding: "var(--cp-space-8)",
          backgroundColor: "var(--cp-color-semantic-bg-canvas)",
          borderRadius: "var(--cp-radius-lg)",
          marginBottom: "var(--cp-space-6)",
        }}
      >
        {[
          ["sm", "var(--cp-shadow-sm)"],
          ["md", "var(--cp-shadow-md)"],
          ["lg", "var(--cp-shadow-lg)"],
          ["xl", "var(--cp-shadow-xl)"],
          ["card", "var(--cp-shadow-card)"],
          ["accent", "var(--cp-shadow-accent)"],
          ["focus-ring", "var(--cp-shadow-focus-ring)"],
        ].map(([token, shadow]) => (
          <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--cp-space-3)" }}>
            <div
              style={{
                width: "6rem",
                height: "4rem",
                borderRadius: "var(--cp-radius-lg)",
                backgroundColor: "var(--cp-color-semantic-bg-surface)",
                boxShadow: shadow,
              }}
            />
            <code className="cp-docs-prose__code" style={{ fontSize: "var(--cp-font-size-xs)" }}>
              shadow.{token}
            </code>
          </div>
        ))}
      </div>

      <h2 className="cp-docs-prose__h2">Princípios</h2>
      <ul className="cp-docs-prose__ul">
        <li>Nunca combine mais de um nível de sombra no mesmo elemento.</li>
        <li>Sombra e mudança de <code className="cp-docs-prose__code">border-color</code> costumam ser usadas juntas em estados de hover (ver <strong>Card</strong> interativo) — a sombra sozinha nem sempre é visível o suficiente em ecrãs de contraste reduzido.</li>
        <li>Em tema escuro, sombras têm menos utilidade visual sobre fundos já escuros — nesse tema, a hierarquia é reforçada principalmente por diferenças de tom de fundo (`bg.surface` vs `bg.surface-secondary`), não por sombra.</li>
      </ul>
    </article>
  );
}
