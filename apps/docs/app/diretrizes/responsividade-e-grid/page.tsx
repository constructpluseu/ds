import type { Metadata } from "next";

export const metadata: Metadata = { title: "Responsividade e grid" };

export default function ResponsividadeEGridPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Responsividade e grid</h1>
      <p className="cp-docs-prose__p">
        Esta diretriz complementa <strong>Fundamentos → Grid e layout</strong> e{" "}
        <strong>Fundamentos → Breakpoints</strong> com regras de comportamento responsivo que se
        aplicam a qualquer composição feita com os componentes do núcleo.
      </p>

      <h2 className="cp-docs-prose__h2">Comportamento por componente</h2>
      <ul className="cp-docs-prose__ul">
        <li><strong>Button:</strong> nunca encolhe abaixo do necessário para o seu rótulo + padding; use `fullWidth` em ecrãs estreitos quando um botão for a única ação disponível.</li>
        <li><strong>Modal:</strong> a caixa de diálogo tem `max-width` fixo mas `width: 100%` dentro desse limite, com `padding` no overlay — em telefones, ocupa quase todo o ecrã automaticamente.</li>
        <li><strong>Tabs:</strong> a lista de separadores não quebra linha — em ecrãs estreitos com muitos separadores, torna-se scrollável horizontalmente (`overflow-x`); é responsabilidade de quem compõe o ecrã limitar o número de separadores em contextos móveis.</li>
        <li><strong>Toast:</strong> a região fixa (`cp-toast-region`) usa `max-width: calc(100vw - espaço)`, garantindo que nunca ultrapassa a viewport em telefones.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Formulários</h2>
      <ul className="cp-docs-prose__ul">
        <li>Campos de formulário ocupam sempre 100% da largura do seu contentor (`width: 100%` no `.cp-input`) — o layout de colunas é controlado por quem compõe o formulário, não pelo componente.</li>
        <li>Em ecrãs `md` e acima, é comum agrupar campos relacionados em 2 colunas via grid; em `sm`, colapse sempre para 1 coluna.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Tabelas e dados densos</h2>
      <p className="cp-docs-prose__p">
        O componente <strong>Data Table</strong> está planeado para uma fase seguinte; até lá,
        qualquer tabela HTML nativa usada nos produtos Construct+ deve ser envolvida num
        contentor com <code className="cp-docs-prose__code">overflow-x: auto</code> em ecrãs
        estreitos, nunca forçada a encolher colunas a um ponto ilegível.
      </p>

      <h2 className="cp-docs-prose__h2">Teste sempre nos 3 alvos principais</h2>
      <p className="cp-docs-prose__p">
        Dado o perfil de uso da Construct Plus (ver <strong>Fundamentos → Breakpoints</strong>),
        valide todo o ecrã novo em pelo menos: telefone (~375px), tablet (~768–1024px, o contexto
        de obra) e desktop (~1280–1440px, o contexto de escritório) — não apenas no maior ecrã
        disponível no monitor de desenvolvimento.
      </p>
    </article>
  );
}
