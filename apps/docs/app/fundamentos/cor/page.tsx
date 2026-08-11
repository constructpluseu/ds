import type { Metadata } from "next";
import { AA_MIN_CONTRAST, bestTextColor, contrastRatio, resolveToHex } from "@/lib/color-contrast";

export const metadata: Metadata = { title: "Cor" };

interface Swatch {
  grupo: string;
  passo: string;
  token: string;
  hex: string;
}

const paleta: Swatch[] = [
  ...["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((passo, i) => ({
    grupo: "Navy (primária)",
    passo,
    token: `color.base.navy.${passo}`,
    hex: ["#EEF2F6", "#DCE3EC", "#B9C8D9", "#96AEC5", "#5D7C9B", "#2C4A6E", "#163352", "#0D2137", "#081828", "#050F1A"][i],
  })),
  ...["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((passo, i) => ({
    grupo: "Mint (destaque)",
    passo,
    token: `color.base.mint.${passo}`,
    hex: ["#EAFBF3", "#CFF6E4", "#9FEDC9", "#5DDBA2", "#4DD29A", "#3EC98E", "#34BA80", "#2BAA74", "#1F8259", "#145A3D"][i],
  })),
  ...["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((passo, i) => ({
    grupo: "Gray (neutra)",
    passo,
    token: `color.base.gray.${passo}`,
    hex: ["#F7F9FC", "#F0F4F8", "#E2E8F0", "#CBD5E1", "#94A3B8", "#64748B", "#475569", "#334155", "#1E293B", "#0F172A"][i],
  })),
  { grupo: "Preto e branco", passo: "white", token: "color.base.white", hex: "#FFFFFF" },
  { grupo: "Preto e branco", passo: "black", token: "color.base.black", hex: "#000000" },
  { grupo: "Red (erro)", passo: "light", token: "color.base.red.light", hex: "#F87171" },
  { grupo: "Red (erro)", passo: "base", token: "color.base.red.base", hex: "#DC2626" },
  { grupo: "Red (erro)", passo: "dark", token: "color.base.red.dark", hex: "#B91C1C" },
  { grupo: "Amber (aviso)", passo: "light", token: "color.base.amber.light", hex: "#FBBF24" },
  { grupo: "Amber (aviso)", passo: "base", token: "color.base.amber.base", hex: "#F59E0B" },
  { grupo: "Amber (aviso)", passo: "dark", token: "color.base.amber.dark", hex: "#B45309" },
  { grupo: "Blue (info)", passo: "light", token: "color.base.blue.light", hex: "#60A5FA" },
  { grupo: "Blue (info)", passo: "base", token: "color.base.blue.base", hex: "#2563EB" },
  { grupo: "Blue (info)", passo: "dark", token: "color.base.blue.dark", hex: "#1D4ED8" },
];

interface Combo {
  contexto: string;
  textoToken: string;
  fundoToken: string;
  textoHex: string;
  fundoCor: string;
  fundoBase: string;
  notaExcecao?: string;
}

const combosLight: Combo[] = [
  { contexto: "Texto principal sobre fundo de página", textoToken: "text.primary", fundoToken: "bg.canvas", textoHex: "#0D2137", fundoCor: "#F7F9FC", fundoBase: "#F7F9FC" },
  { contexto: "Texto principal sobre superfície (cartão/campo)", textoToken: "text.primary", fundoToken: "bg.surface", textoHex: "#0D2137", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto principal sobre superfície secundária", textoToken: "text.primary", fundoToken: "bg.surface-secondary", textoHex: "#0D2137", fundoCor: "#F0F4F8", fundoBase: "#F0F4F8" },
  { contexto: "Texto secundário/legenda sobre superfície", textoToken: "text.secondary", fundoToken: "bg.surface", textoHex: "#475569", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto sobre botão/fundo de marca", textoToken: "text.on-brand", fundoToken: "bg.brand", textoHex: "#FFFFFF", fundoCor: "#0D2137", fundoBase: "#0D2137" },
  { contexto: "Texto sobre botão de marca em hover", textoToken: "text.on-brand", fundoToken: "bg.brand-hover", textoHex: "#FFFFFF", fundoCor: "#163352", fundoBase: "#163352" },
  { contexto: "Texto sobre botão/fundo de destaque (accent)", textoToken: "text.on-accent", fundoToken: "bg.accent", textoHex: "#081828", fundoCor: "#3EC98E", fundoBase: "#3EC98E" },
  { contexto: "Texto sobre destaque em hover", textoToken: "text.on-accent", fundoToken: "bg.accent-hover", textoHex: "#081828", fundoCor: "#4DD29A", fundoBase: "#4DD29A" },
  { contexto: "Link de texto sobre superfície", textoToken: "text.link", fundoToken: "bg.surface", textoHex: "#0D2137", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto de erro sobre superfície", textoToken: "text.danger", fundoToken: "bg.surface", textoHex: "#DC2626", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto de aviso sobre superfície", textoToken: "text.warning", fundoToken: "bg.surface", textoHex: "#B45309", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto de sucesso sobre superfície", textoToken: "text.success", fundoToken: "bg.surface", textoHex: "#145A3D", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Texto de informação sobre superfície", textoToken: "text.info", fundoToken: "bg.surface", textoHex: "#2563EB", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF" },
  { contexto: "Badge de sucesso (texto sobre fundo subtil)", textoToken: "status.success.text", fundoToken: "status.success.bg", textoHex: "#145A3D", fundoCor: "rgba(62,201,142,0.12)", fundoBase: "#FFFFFF" },
  { contexto: "Badge de aviso (texto sobre fundo subtil)", textoToken: "status.warning.text", fundoToken: "status.warning.bg", textoHex: "#B45309", fundoCor: "rgba(245,158,11,0.12)", fundoBase: "#FFFFFF" },
  { contexto: "Badge de erro (texto sobre fundo subtil)", textoToken: "status.danger.text", fundoToken: "status.danger.bg", textoHex: "#B91C1C", fundoCor: "rgba(220,38,38,0.12)", fundoBase: "#FFFFFF" },
  { contexto: "Badge de informação (texto sobre fundo subtil)", textoToken: "status.info.text", fundoToken: "status.info.bg", textoHex: "#1D4ED8", fundoCor: "rgba(37,99,235,0.12)", fundoBase: "#FFFFFF" },
  { contexto: "Badge neutro (texto sobre fundo subtil)", textoToken: "status.neutral.text", fundoToken: "status.neutral.bg", textoHex: "#334155", fundoCor: "#F0F4F8", fundoBase: "#F0F4F8" },
  { contexto: "Texto desativado sobre superfície", textoToken: "text.disabled", fundoToken: "bg.surface", textoHex: "#94A3B8", fundoCor: "#FFFFFF", fundoBase: "#FFFFFF", notaExcecao: "Exceção WCAG 1.4.3: conteúdo desativado/inativo não precisa de cumprir 4.5:1." },
];

const combosDark: Combo[] = [
  { contexto: "Texto principal sobre fundo de página", textoToken: "text.primary", fundoToken: "bg.canvas", textoHex: "#F7F9FC", fundoCor: "#050F1A", fundoBase: "#050F1A" },
  { contexto: "Texto principal sobre superfície (cartão/campo)", textoToken: "text.primary", fundoToken: "bg.surface", textoHex: "#F7F9FC", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto principal sobre superfície secundária", textoToken: "text.primary", fundoToken: "bg.surface-secondary", textoHex: "#F7F9FC", fundoCor: "#0D2137", fundoBase: "#0D2137" },
  { contexto: "Texto secundário/legenda sobre superfície", textoToken: "text.secondary", fundoToken: "bg.surface", textoHex: "#CBD5E1", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto sobre botão/fundo de marca", textoToken: "text.on-brand", fundoToken: "bg.brand", textoHex: "#081828", fundoCor: "#3EC98E", fundoBase: "#3EC98E" },
  { contexto: "Texto sobre botão de marca em hover", textoToken: "text.on-brand", fundoToken: "bg.brand-hover", textoHex: "#081828", fundoCor: "#4DD29A", fundoBase: "#4DD29A" },
  { contexto: "Texto sobre botão/fundo de destaque (accent)", textoToken: "text.on-accent", fundoToken: "bg.accent", textoHex: "#081828", fundoCor: "#3EC98E", fundoBase: "#3EC98E" },
  { contexto: "Texto sobre destaque em hover", textoToken: "text.on-accent", fundoToken: "bg.accent-hover", textoHex: "#081828", fundoCor: "#4DD29A", fundoBase: "#4DD29A" },
  { contexto: "Link de texto sobre superfície", textoToken: "text.link", fundoToken: "bg.surface", textoHex: "#5DDBA2", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto de erro sobre superfície", textoToken: "text.danger", fundoToken: "bg.surface", textoHex: "#F87171", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto de aviso sobre superfície", textoToken: "text.warning", fundoToken: "bg.surface", textoHex: "#FBBF24", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto de sucesso sobre superfície", textoToken: "text.success", fundoToken: "bg.surface", textoHex: "#5DDBA2", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Texto de informação sobre superfície", textoToken: "text.info", fundoToken: "bg.surface", textoHex: "#60A5FA", fundoCor: "#081828", fundoBase: "#081828" },
  { contexto: "Badge de sucesso (texto sobre fundo subtil)", textoToken: "status.success.text", fundoToken: "status.success.bg", textoHex: "#5DDBA2", fundoCor: "rgba(62,201,142,0.16)", fundoBase: "#081828" },
  { contexto: "Badge de aviso (texto sobre fundo subtil)", textoToken: "status.warning.text", fundoToken: "status.warning.bg", textoHex: "#FBBF24", fundoCor: "rgba(245,158,11,0.16)", fundoBase: "#081828" },
  { contexto: "Badge de erro (texto sobre fundo subtil)", textoToken: "status.danger.text", fundoToken: "status.danger.bg", textoHex: "#F87171", fundoCor: "rgba(220,38,38,0.16)", fundoBase: "#081828" },
  { contexto: "Badge de informação (texto sobre fundo subtil)", textoToken: "status.info.text", fundoToken: "status.info.bg", textoHex: "#60A5FA", fundoCor: "rgba(37,99,235,0.16)", fundoBase: "#081828" },
  { contexto: "Badge neutro (texto sobre fundo subtil)", textoToken: "status.neutral.text", fundoToken: "status.neutral.bg", textoHex: "#CBD5E1", fundoCor: "rgba(255,255,255,0.08)", fundoBase: "#081828" },
  { contexto: "Texto desativado sobre superfície", textoToken: "text.disabled", fundoToken: "bg.surface", textoHex: "#475569", fundoCor: "#081828", fundoBase: "#081828", notaExcecao: "Exceção WCAG 1.4.3: conteúdo desativado/inativo não precisa de cumprir 4.5:1." },
];

function SwatchCell({ hex }: { hex: string }) {
  const { color } = bestTextColor(hex);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "6.5rem",
        padding: "0.35rem 0.6rem",
        borderRadius: "var(--cp-radius-md)",
        backgroundColor: hex,
        color,
        fontFamily: "var(--cp-font-family-mono)",
        fontSize: "var(--cp-font-size-xs)",
        fontWeight: 600,
        border: hex === "#FFFFFF" ? "1px solid var(--cp-color-semantic-border-default)" : undefined,
      }}
    >
      {hex}
    </span>
  );
}

function ComboRows({ combos }: { combos: Combo[] }) {
  return (
    <>
      {combos.map((combo) => {
        const fundoResolvido = resolveToHex(combo.fundoCor, combo.fundoBase);
        const ratio = contrastRatio(combo.textoHex, fundoResolvido);
        const passa = ratio >= AA_MIN_CONTRAST;
        return (
          <tr key={`${combo.textoToken}-${combo.fundoToken}-${combo.contexto}`}>
            <td>
              {combo.contexto}
              <br />
              <code className="cp-docs-prose__code" style={{ fontSize: "0.8em" }}>
                {combo.textoToken}
              </code>{" "}
              /{" "}
              <code className="cp-docs-prose__code" style={{ fontSize: "0.8em" }}>
                {combo.fundoToken}
              </code>
            </td>
            <td><SwatchCell hex={combo.textoHex} /></td>
            <td><SwatchCell hex={fundoResolvido} /></td>
            <td style={{ fontFamily: "var(--cp-font-family-mono)", whiteSpace: "nowrap" }}>{ratio.toFixed(1)}:1</td>
            <td>
              {passa ? (
                <span className="cp-docs-badge cp-docs-badge--disponivel">✓ AA</span>
              ) : combo.notaExcecao ? (
                <span className="cp-docs-badge cp-docs-badge--planeado" title={combo.notaExcecao}>
                  Exceção
                </span>
              ) : (
                <span className="cp-docs-badge" style={{ backgroundColor: "var(--cp-color-semantic-status-danger-bg)", color: "var(--cp-color-semantic-status-danger-text)", borderColor: "var(--cp-color-semantic-status-danger-border)" }}>
                  ✗ Falha
                </span>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default function CorPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Cor</h1>
      <p className="cp-docs-prose__p">
        O sistema de cor do Construct+ Design System organiza-se em duas camadas: uma{" "}
        <strong>paleta base</strong> (os valores de cor concretos) e uma{" "}
        <strong>camada semântica</strong> (papéis como &ldquo;fundo de superfície&rdquo; ou
        &ldquo;texto secundário&rdquo; que referenciam a paleta base). Os componentes usam sempre
        tokens semânticos — nunca a paleta base diretamente — o que permite que o tema escuro
        troque os valores sem alterar nenhum componente.
      </p>

      <h2 className="cp-docs-prose__h2">Paleta base — todas as cores</h2>
      <p className="cp-docs-prose__p">
        Todos os valores da paleta, sem exceção. A coluna <strong>Valor</strong> mostra a cor real
        no fundo da célula, com o código hexadecimal escrito na cor (preto ou branco) que garante
        o maior contraste possível sobre esse fundo — nunca inferior a 4.5:1 (WCAG 2.1 AA).
      </p>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Passo</th>
            <th>Token</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {paleta.map((cor) => (
            <tr key={cor.token}>
              <td>{cor.grupo}</td>
              <td>{cor.passo}</td>
              <td><code className="cp-docs-prose__code">{cor.token}</code></td>
              <td><SwatchCell hex={cor.hex} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Combinações de uso e contraste — tema claro</h2>
      <p className="cp-docs-prose__p">
        Todas as combinações de texto sobre fundo realmente usadas pelos componentes, com a razão
        de contraste calculada a partir dos valores reais (fórmula WCAG 2.1, relativa a
        luminância). Fundos com transparência (usados em badges/notificações subtis) são
        compostos sobre a superfície em que são normalmente aplicados antes do cálculo.
      </p>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Combinação / tokens</th>
            <th>Texto</th>
            <th>Fundo</th>
            <th>Contraste</th>
            <th>Conformidade</th>
          </tr>
        </thead>
        <tbody>
          <ComboRows combos={combosLight} />
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Combinações de uso e contraste — tema escuro</h2>
      <p className="cp-docs-prose__p">Os mesmos contextos, com os valores que o tema escuro resolve.</p>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Combinação / tokens</th>
            <th>Texto</th>
            <th>Fundo</th>
            <th>Contraste</th>
            <th>Conformidade</th>
          </tr>
        </thead>
        <tbody>
          <ComboRows combos={combosDark} />
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Cores de estado</h2>
      <p className="cp-docs-prose__p">
        Cinco estados semânticos cobrem feedback e classificação em toda a plataforma:{" "}
        <code className="cp-docs-prose__code">neutral</code>,{" "}
        <code className="cp-docs-prose__code">info</code>,{" "}
        <code className="cp-docs-prose__code">success</code>,{" "}
        <code className="cp-docs-prose__code">warning</code> e{" "}
        <code className="cp-docs-prose__code">danger</code>. Cada um tem uma variante de fundo
        subtil, texto e borda, usados de forma consistente em <strong>Tag</strong>,{" "}
        <strong>Notification</strong> e <strong>Progress Bar</strong> — ver os valores exatos e o
        contraste de cada combinação nas tabelas acima.
      </p>

      <h2 className="cp-docs-prose__h2">Contraste e acessibilidade</h2>
      <ul className="cp-docs-prose__ul">
        <li>Todo o texto sobre fundo cumpre um mínimo de contraste 4.5:1 (WCAG 2.1 AA) em ambos os temas — ver a tabela de combinações acima para os valores calculados.</li>
        <li>A única exceção prevista é texto de conteúdo desativado/inativo, isento pela própria WCAG 1.4.3.</li>
        <li>Nunca comunique um estado usando apenas cor — combine sempre com texto, ícone ou padrão (ver <strong>Tag</strong> e <strong>Notification</strong>).</li>
        <li>O anel de foco (<code className="cp-docs-prose__code">border.focus</code>) usa sempre a cor de destaque, nunca a cor de fundo do elemento, para garantir contraste em qualquer superfície.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Como consumir</h2>
      <p className="cp-docs-prose__p">
        Nunca escreva valores hexadecimais diretamente no código da aplicação. Use sempre a
        variável CSS correspondente, por exemplo:
      </p>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`.meu-elemento {
  color: var(--cp-color-semantic-text-primary);
  background-color: var(--cp-color-semantic-bg-surface);
}`}</code>
      </pre>
    </article>
  );
}
