import type { Metadata } from "next";

export const metadata: Metadata = { title: "Motion" };

const duracoes = [
  ["fast", "150ms", "Hover, foco, transições de cor em botões e campos"],
  ["base", "200ms", "Transições de estado padrão (a maioria dos casos)"],
  ["moderate", "300ms", "Entrada/saída de modais e menus"],
  ["slow", "400ms", "Animações de maior escala (rotação de spinner)"],
];

const easings = [
  ["standard", "cubic-bezier(0.4, 0, 0.2, 1)", "Transições gerais de estado (hover, cor, sombra)"],
  ["entrance", "cubic-bezier(0, 0, 0.2, 1)", "Elementos que entram no ecrã (fade-in de overlay)"],
  ["exit", "cubic-bezier(0.4, 0, 1, 1)", "Elementos que saem do ecrã"],
  ["spring", "cubic-bezier(0.34, 1.56, 0.64, 1)", "Microinterações com sensação tátil (Toggle, marca do Checkbox, abertura de modal)"],
];

export default function MotionPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Motion</h1>
      <p className="cp-docs-prose__p">
        O movimento no Construct+ Design System serve para comunicar mudança de estado e dar
        continuidade espacial — nunca para decorar. Toda a animação usa os tokens de duração e
        easing abaixo, nunca valores arbitrários.
      </p>

      <h2 className="cp-docs-prose__h2">Durações</h2>
      <table className="cp-docs-prose__table">
        <thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
        <tbody>
          {duracoes.map(([token, valor, uso]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">motion.duration.{token}</code></td>
              <td>{valor}</td>
              <td>{uso}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Easings</h2>
      <table className="cp-docs-prose__table">
        <thead><tr><th>Token</th><th>Curva</th><th>Uso</th></tr></thead>
        <tbody>
          {easings.map(([token, curva, uso]) => (
            <tr key={token}>
              <td><code className="cp-docs-prose__code">motion.easing.{token}</code></td>
              <td>{curva}</td>
              <td>{uso}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Exemplos práticos</h2>
      <p className="cp-docs-prose__p">
        Animações reais, em ciclo contínuo, usando os tokens de duração e easing exatos indicados
        em cada legenda. A duração de cada ciclo foi ampliada (×8) só para ser confortável de
        observar em loop — a curva de easing aplicada é sempre a real.
      </p>

      <style>{`
        @keyframes cpDocsMotionButton {
          0%, 40% { background-color: var(--cp-color-semantic-bg-brand); }
          50%, 90% { background-color: var(--cp-color-semantic-bg-brand-hover); }
          100% { background-color: var(--cp-color-semantic-bg-brand); }
        }
        @keyframes cpDocsMotionToggleThumb {
          0%, 40% { transform: translateX(0); }
          50%, 90% { transform: translateX(1.25rem); }
          100% { transform: translateX(0); }
        }
        @keyframes cpDocsMotionModalOverlay {
          0%, 15% { opacity: 0; }
          30%, 85% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes cpDocsMotionModalCard {
          0%, 15% { opacity: 0; transform: scale(0.9); }
          40%, 85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
        @keyframes cpDocsMotionToast {
          0%, 15% { opacity: 0; transform: translateX(2rem); }
          40%, 85% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(2rem); }
        }
        @keyframes cpDocsMotionChevron {
          0%, 40% { transform: rotate(0deg); }
          50%, 90% { transform: rotate(180deg); }
          100% { transform: rotate(0deg); }
        }
        .cp-docs-motion-demo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--cp-space-3);
          padding: var(--cp-space-6);
          border: 1px solid var(--cp-color-semantic-border-default);
          border-radius: var(--cp-radius-lg);
          background-color: var(--cp-color-semantic-bg-surface);
          margin-bottom: var(--cp-space-4);
          min-height: 4.5rem;
          justify-content: center;
        }
        .cp-docs-motion-caption {
          font-size: var(--cp-font-size-xs);
          color: var(--cp-color-semantic-text-secondary);
        }
      `}</style>

      <div className="cp-docs-motion-demo">
        <div
          style={{
            width: "8rem",
            height: "2.25rem",
            borderRadius: "var(--cp-radius-xl)",
            animation: "cpDocsMotionButton calc(var(--cp-motion-duration-fast) * 8) var(--cp-motion-easing-standard) infinite",
          }}
        />
        <span className="cp-docs-motion-caption">
          <strong>Button</strong> — hover de cor · <code className="cp-docs-prose__code">duration.fast</code> + <code className="cp-docs-prose__code">easing.standard</code>
        </span>
      </div>

      <div className="cp-docs-motion-demo">
        <div
          style={{
            width: "2.75rem",
            height: "1.5rem",
            borderRadius: "var(--cp-radius-full)",
            backgroundColor: "var(--cp-color-semantic-bg-accent)",
            padding: "0.1875rem",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "1.125rem",
              height: "1.125rem",
              borderRadius: "var(--cp-radius-full)",
              backgroundColor: "var(--cp-color-semantic-text-on-accent)",
              animation: "cpDocsMotionToggleThumb calc(var(--cp-motion-duration-base) * 8) var(--cp-motion-easing-spring) infinite",
            }}
          />
        </div>
        <span className="cp-docs-motion-caption">
          <strong>Toggle</strong> — deslize do indicador · <code className="cp-docs-prose__code">duration.base</code> + <code className="cp-docs-prose__code">easing.spring</code>
        </span>
      </div>

      <div className="cp-docs-motion-demo" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--cp-color-semantic-bg-overlay)",
            animation: "cpDocsMotionModalOverlay calc(var(--cp-motion-duration-base) * 8) var(--cp-motion-easing-entrance) infinite",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "9rem",
            height: "2.5rem",
            borderRadius: "var(--cp-radius-lg)",
            backgroundColor: "var(--cp-color-semantic-bg-surface)",
            boxShadow: "var(--cp-shadow-lg)",
            margin: "0 auto",
            animation: "cpDocsMotionModalCard calc(var(--cp-motion-duration-moderate) * 8) var(--cp-motion-easing-spring) infinite",
          }}
        />
        <span className="cp-docs-motion-caption" style={{ position: "relative" }}>
          <strong>Modal</strong> — fade da sobreposição (<code className="cp-docs-prose__code">duration.base</code> + <code className="cp-docs-prose__code">easing.entrance</code>) e escala da caixa (<code className="cp-docs-prose__code">duration.moderate</code> + <code className="cp-docs-prose__code">easing.spring</code>)
        </span>
      </div>

      <div className="cp-docs-motion-demo">
        <div
          style={{
            width: "9rem",
            height: "2rem",
            borderRadius: "var(--cp-radius-md)",
            backgroundColor: "var(--cp-color-semantic-status-success-bg)",
            border: "1px solid var(--cp-color-semantic-status-success-border)",
            animation: "cpDocsMotionToast calc(var(--cp-motion-duration-moderate) * 8) var(--cp-motion-easing-spring) infinite",
          }}
        />
        <span className="cp-docs-motion-caption">
          <strong>Toast</strong> — entrada deslizante · <code className="cp-docs-prose__code">duration.moderate</code> + <code className="cp-docs-prose__code">easing.spring</code>
        </span>
      </div>

      <div className="cp-docs-motion-demo">
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            fontSize: "var(--cp-font-size-xl)",
            color: "var(--cp-color-semantic-text-secondary)",
            animation: "cpDocsMotionChevron calc(var(--cp-motion-duration-fast) * 8) var(--cp-motion-easing-standard) infinite",
          }}
        >
          ▾
        </span>
        <span className="cp-docs-motion-caption">
          <strong>Accordion</strong> — rotação do chevron · <code className="cp-docs-prose__code">duration.fast</code> + <code className="cp-docs-prose__code">easing.standard</code>
        </span>
      </div>

      <h2 className="cp-docs-prose__h2">Movimento reduzido</h2>
      <p className="cp-docs-prose__p">
        Todos os componentes com animação respeitam{" "}
        <code className="cp-docs-prose__code">@media (prefers-reduced-motion: reduce)</code>,
        removendo ou encurtando drasticamente animações não essenciais (ex.: o spinner do botão em
        carregamento passa a girar mais lentamente; as transições de entrada de modal/toast são
        desativadas). Nunca dependa de movimento para comunicar informação que não esteja também
        disponível de outra forma (texto, ícone estático, posição).
      </p>
    </article>
  );
}
