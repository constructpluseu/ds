import { Button } from "@constructpluseu/react";
import { ThemeToggle } from "./theme-toggle";

export default function HomePage() {
  return (
    <main className="cp-container" style={{ paddingBlock: "var(--cp-space-12)" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--cp-space-8)",
        }}
      >
        <div>
          <p
            style={{
              color: "var(--cp-color-semantic-text-secondary)",
              fontSize: "var(--cp-font-size-sm)",
              fontWeight: "var(--cp-font-weight-semibold)",
            }}
          >
            Construct+ Design System
          </p>
          <h1
            style={{
              fontSize: "var(--cp-font-size-4xl)",
              fontWeight: "var(--cp-font-weight-extrabold)",
              margin: 0,
            }}
          >
            Demonstração em Next.js (App Router)
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <section
        style={{
          backgroundColor: "var(--cp-color-semantic-bg-surface)",
          border: "1px solid var(--cp-color-semantic-border-default)",
          borderRadius: "var(--cp-radius-xl)",
          boxShadow: "var(--cp-shadow-card)",
          padding: "var(--cp-space-8)",
          maxWidth: "32rem",
        }}
      >
        <h2 style={{ fontSize: "var(--cp-font-size-xl)", marginBottom: "var(--cp-space-4)" }}>
          Nova obra
        </h2>
        <p
          style={{
            color: "var(--cp-color-semantic-text-secondary)",
            marginBottom: "var(--cp-space-6)",
          }}
        >
          Esta secção prova que o componente <code>Button</code> de{" "}
          <code>@constructpluseu/react</code> renderiza corretamente em SSR, sem erros de
          hidratação, e responde ao tema claro/escuro através de <code>data-theme</code>.
        </p>
        <div style={{ display: "flex", gap: "var(--cp-space-3)", flexWrap: "wrap" }}>
          <Button variant="primary">Guardar obra</Button>
          <Button variant="accent">Avançar para orçamento</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Ver detalhes</Button>
          <Button variant="danger">Eliminar</Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--cp-space-3)",
            marginTop: "var(--cp-space-4)",
            flexWrap: "wrap",
          }}
        >
          <Button size="sm">Pequeno</Button>
          <Button size="md">Médio</Button>
          <Button size="lg">Grande</Button>
          <Button loading>A guardar…</Button>
          <Button disabled>Indisponível</Button>
        </div>
      </section>
    </main>
  );
}
