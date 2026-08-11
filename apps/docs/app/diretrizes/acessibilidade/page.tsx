import type { Metadata } from "next";

export const metadata: Metadata = { title: "Acessibilidade" };

export default function AcessibilidadePage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Acessibilidade</h1>
      <p className="cp-docs-prose__p">
        O Construct+ Design System visa cumprir <strong>WCAG 2.1 nível AA</strong> em todos os
        componentes do núcleo. Acessibilidade não é uma camada adicionada depois — está embutida
        na implementação de cada componente (papéis ARIA corretos, gestão de foco, contraste de
        cor) e verificada com testes automatizados e QA manual.
      </p>

      <h2 className="cp-docs-prose__h2">O que já está garantido pelo núcleo</h2>
      <ul className="cp-docs-prose__ul">
        <li><strong>Contraste de cor:</strong> todos os pares texto/fundo definidos pelos tokens semânticos cumprem 4.5:1 em ambos os temas (ver <strong>Fundamentos → Cor</strong>).</li>
        <li><strong>Foco visível:</strong> todos os elementos interativos mostram um anel de foco consistente ao navegar por teclado, nunca apenas ao clicar com o rato (via <code className="cp-docs-prose__code">:focus-visible</code>).</li>
        <li><strong>Papéis e atributos ARIA corretos por padrão:</strong> ex. `Modal` com `role=&quot;dialog&quot;` + `aria-modal`, `Tabs` com `role=&quot;tablist&quot;`/`tab`/`tabpanel`, `Accordion` com `aria-expanded`/`aria-controls`.</li>
        <li><strong>Gestão de foco em overlays:</strong> `Modal` move o foco para dentro de si ao abrir, aprisiona-o (`Tab`/`Shift+Tab`) e devolve-o ao elemento de origem ao fechar.</li>
        <li><strong>Navegação por teclado completa:</strong> nenhum componente do núcleo depende exclusivamente do rato — `Tabs` e `Accordion` seguem os padrões de teclado do WAI-ARIA Authoring Practices Guide (setas, Home/End).</li>
        <li><strong>Associação label/campo/erro:</strong> todos os componentes de formulário associam `label` via `for`/`id` e ligam texto de ajuda/erro via `aria-describedby` e `aria-invalid`.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Testes automatizados</h2>
      <p className="cp-docs-prose__p">
        Cada componente do núcleo tem testes unitários (Vitest + Testing Library em React/Vue,
        Jest em Angular) que verificam explicitamente: papel/atributos ARIA corretos, comportamento
        de teclado (onde aplicável), e que estados `disabled` bloqueiam interação. O lint inclui{" "}
        <code className="cp-docs-prose__code">eslint-plugin-jsx-a11y</code> (React) e regras
        equivalentes de template para Vue e Angular.
      </p>

      <h2 className="cp-docs-prose__h2">Responsabilidade de quem usa os componentes</h2>
      <p className="cp-docs-prose__p">
        O design system garante que o <em>componente</em> é acessível — não pode garantir que a{" "}
        <em>composição</em> feita pela equipa de produto o seja. Ao usar os componentes:
      </p>
      <ul className="cp-docs-prose__ul">
        <li>Forneça sempre um <code className="cp-docs-prose__code">label</code> real (nunca apenas `placeholder`) em campos de formulário.</li>
        <li>Forneça <code className="cp-docs-prose__code">aria-label</code> em botões que contenham apenas um ícone.</li>
        <li>Não desative o anel de foco visível via CSS customizado.</li>
        <li>Ao compor um formulário com vários campos, mantenha uma ordem de leitura/tabulação lógica que corresponda à ordem visual.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Testado, mas não com todos os leitores de ecrã</h2>
      <p className="cp-docs-prose__p">
        Nesta fase, a verificação é feita por testes automatizados de papel/atributo/teclado e QA
        manual com navegação por teclado — testes formais com leitores de ecrã específicos (NVDA,
        JAWS, VoiceOver) em todos os componentes ficam para uma fase de auditoria dedicada.
      </p>
    </article>
  );
}
