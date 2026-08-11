import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ícones" };

export default function IconesPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Ícones</h1>
      <p className="cp-docs-prose__p">
        Uma biblioteca de ícones dedicada e catalogada está <strong>planeada</strong> para uma fase
        seguinte do Construct+ Design System. Esta página estabelece, desde já, os princípios que
        essa biblioteca — e qualquer ícone usado entretanto pelos componentes existentes — deve
        seguir.
      </p>

      <h2 className="cp-docs-prose__h2">Princípios visuais</h2>
      <ul className="cp-docs-prose__ul">
        <li><strong>Cor via <code className="cp-docs-prose__code">currentColor</code>:</strong> um ícone nunca define a sua própria cor — herda sempre a cor de texto do contexto onde está inserido, para se adaptar automaticamente ao tema claro/escuro e a estados (hover, disabled).</li>
        <li><strong>Grelha de 24×24px:</strong> todos os ícones devem ser desenhados numa grelha quadrada de 24px, com traço (`stroke`) consistente — atualmente 2px, à semelhança dos indicadores desenhados em CSS puro no Accordion e no Select.</li>
        <li><strong>Sem preenchimento decorativo:</strong> preferir ícones de traço (outline) a ícones preenchidos (solid), consistente com a estética &ldquo;soft corporate&rdquo; da marca.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Tamanhos</h2>
      <p className="cp-docs-prose__p">
        Três tamanhos previstos, alinhados com a escala tipográfica: <strong>16px</strong> (dentro
        de texto de tamanho <code className="cp-docs-prose__code">sm</code>/<code className="cp-docs-prose__code">md</code>),{" "}
        <strong>20px</strong> (dentro de botões <code className="cp-docs-prose__code">md</code>/<code className="cp-docs-prose__code">lg</code>) e{" "}
        <strong>24px</strong> (uso autónomo, ex. num cabeçalho).
      </p>

      <h2 className="cp-docs-prose__h2">Ícones desenhados em CSS (uso atual)</h2>
      <p className="cp-docs-prose__p">
        Até à biblioteca dedicada existir, três indicadores visuais do design system são
        desenhados diretamente em CSS puro, sem dependência de nenhum ficheiro de ícone externo:
      </p>
      <ul className="cp-docs-prose__ul">
        <li>A seta do <strong>Select</strong> (chevron duplo via gradiente CSS).</li>
        <li>O chevron do <strong>Accordion</strong> (rotação de um canto com duas bordas).</li>
        <li>A marca de verificação do <strong>Checkbox</strong> e o ponto do <strong>Radio Button</strong>.</li>
      </ul>
      <p className="cp-docs-prose__p">
        Esta abordagem foi deliberada: evita adicionar uma dependência de biblioteca de ícones só
        para três indicadores simples, mantendo o núcleo do design system leve.
      </p>

      <h2 className="cp-docs-prose__h2">Acessibilidade</h2>
      <ul className="cp-docs-prose__ul">
        <li>Ícones puramente decorativos (que acompanham um rótulo de texto visível) devem ter <code className="cp-docs-prose__code">aria-hidden=&quot;true&quot;</code>, como já acontece no ícone de estado do <strong>Notification</strong>.</li>
        <li>Ícones que são o <em>único</em> conteúdo de um elemento interativo (ex.: um futuro botão &ldquo;apenas ícone&rdquo;) exigem sempre um <code className="cp-docs-prose__code">aria-label</code> textual equivalente.</li>
      </ul>
    </article>
  );
}
