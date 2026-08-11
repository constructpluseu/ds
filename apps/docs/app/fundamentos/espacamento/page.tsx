import type { Metadata } from "next";

export const metadata: Metadata = { title: "Espaçamento" };

const escala = [
  ["0", "0rem", "0px"],
  ["1", "0.25rem", "4px"],
  ["2", "0.5rem", "8px"],
  ["3", "0.75rem", "12px"],
  ["4", "1rem", "16px"],
  ["5", "1.25rem", "20px"],
  ["6", "1.5rem", "24px"],
  ["8", "2rem", "32px"],
  ["10", "2.5rem", "40px"],
  ["12", "3rem", "48px"],
  ["16", "4rem", "64px"],
  ["20", "5rem", "80px"],
  ["24", "6rem", "96px"],
  ["32", "8rem", "128px"],
  ["40", "10rem", "160px"],
] as const;

function ExampleBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--cp-space-4)" }}>
      <p
        style={{
          marginBottom: "var(--cp-space-2)",
          fontSize: "var(--cp-font-size-sm)",
          color: "var(--cp-color-semantic-text-secondary)",
        }}
      >
        {label}
      </p>
      <div
        style={{
          border: "1px dashed var(--cp-color-semantic-border-strong)",
          borderRadius: "var(--cp-radius-lg)",
          padding: "var(--cp-space-4)",
          backgroundColor: "var(--cp-color-semantic-bg-surface-secondary)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MockField({ text = "Nome da obra" }: { text?: string }) {
  return (
    <div
      style={{
        padding: "var(--cp-space-2) var(--cp-space-4)",
        border: "1px solid var(--cp-color-semantic-border-default)",
        borderRadius: "var(--cp-radius-md)",
        backgroundColor: "var(--cp-color-semantic-bg-surface)",
        fontSize: "var(--cp-font-size-sm)",
        color: "var(--cp-color-semantic-text-secondary)",
      }}
    >
      {text}
    </div>
  );
}

export default function EspacamentoPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Espaçamento</h1>
      <p className="cp-docs-prose__p">
        Uma escala única de espaçamento (<code className="cp-docs-prose__code">--cp-space-*</code>)
        governa margens, padding e gaps em toda a plataforma. Usar sempre a escala — nunca valores
        arbitrários — garante ritmo visual consistente entre componentes e páginas.
      </p>

      <h2 className="cp-docs-prose__h2">Escala</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr><th>Token</th><th>rem</th><th>px</th><th>Exemplo</th></tr>
        </thead>
        <tbody>
          {escala.map(([token, rem, px]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">--cp-space-{token}</code></td>
              <td>{rem}</td>
              <td>{px}</td>
              <td>
                <div
                  style={{
                    width: rem === "0rem" ? "2px" : rem,
                    height: "0.875rem",
                    backgroundColor: "var(--cp-color-semantic-accent-default)",
                    borderRadius: "var(--cp-radius-sm)",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Convenções por contexto</h2>

      <ExampleBox label="Padding interno de botões e campos — space-3 a space-4 horizontal">
        <MockField text="Guardar obra" />
      </ExampleBox>

      <ExampleBox label="Padding interno de cartões — space-6 em todos os lados">
        <div
          style={{
            padding: "var(--cp-space-6)",
            border: "1px solid var(--cp-color-semantic-border-default)",
            borderRadius: "var(--cp-radius-lg)",
            backgroundColor: "var(--cp-color-semantic-bg-surface)",
            display: "inline-block",
          }}
        >
          <p style={{ margin: 0, fontSize: "var(--cp-font-size-sm)", color: "var(--cp-color-semantic-text-primary)" }}>
            Conteúdo do cartão
          </p>
        </div>
      </ExampleBox>

      <ExampleBox label="Espaço entre campos de um formulário — space-4 a space-6">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--cp-space-4)", maxWidth: "16rem" }}>
          <MockField text="Nome da obra" />
          <MockField text="Data de início" />
        </div>
      </ExampleBox>

      <ExampleBox label="Espaço entre secções de página — space-12 a space-24">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--cp-space-12)" }}>
          <div style={{ height: "1.5rem", borderRadius: "var(--cp-radius-md)", backgroundColor: "var(--cp-color-semantic-bg-accent-subtle)" }} />
          <div style={{ height: "1.5rem", borderRadius: "var(--cp-radius-md)", backgroundColor: "var(--cp-color-semantic-bg-accent-subtle)" }} />
        </div>
      </ExampleBox>

      <h2 className="cp-docs-prose__h2">Princípio de empilhamento (stacking)</h2>
      <p className="cp-docs-prose__p">
        Prefira controlar o espaço entre elementos irmãos através de <code className="cp-docs-prose__code">gap</code>{" "}
        (flex/grid) em vez de margens individuais — evita colapso de margens e torna o espaçamento
        mais previsível ao reordenar elementos.
      </p>

      <h2 className="cp-docs-prose__h2">Como consumir</h2>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`.cartao {
  padding: var(--cp-space-6);
  display: flex;
  flex-direction: column;
  gap: var(--cp-space-4);
}`}</code>
      </pre>
    </article>
  );
}
