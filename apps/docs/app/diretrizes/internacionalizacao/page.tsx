import type { Metadata } from "next";

export const metadata: Metadata = { title: "Internacionalização" };

export default function InternacionalizacaoPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Internacionalização</h1>
      <p className="cp-docs-prose__p">
        Nesta fase, o Construct+ Design System e os produtos que o consomem têm{" "}
        <strong>português europeu (pt-PT) como único idioma</strong>, alinhado com o mercado
        primário da Construct Plus (Portugal, com expansão prevista para a UE). Esta página
        estabelece, ainda assim, princípios técnicos que evitam retrabalho caso a
        internacionalização venha a ser necessária.
      </p>

      <h2 className="cp-docs-prose__h2">O que já está preparado</h2>
      <ul className="cp-docs-prose__ul">
        <li>Nenhum componente do núcleo tem texto fixo &ldquo;hardcoded&rdquo; na sua lógica — todo o texto visível (rótulos, mensagens) é passado via props/inputs pelo consumidor, nunca gerado internamente pelo componente.</li>
        <li>O <code className="cp-docs-prose__code">&lt;html lang=&quot;pt-PT&quot;&gt;</code> está definido consistentemente no site de documentação e nas apps de exemplo — qualquer produto Construct+ deve fazer o mesmo, e atualizar o atributo `lang` se/quando suportar múltiplos idiomas.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Direção de texto (RTL)</h2>
      <p className="cp-docs-prose__p">
        Nenhum componente foi testado ou adaptado para direção da direita para a esquerda (RTL) —
        não é um requisito atual do mercado-alvo. Se surgir essa necessidade no futuro, os pontos
        de maior atenção seriam: o posicionamento do ícone/thumb do <strong>Toggle</strong>, a
        seta do <strong>Select</strong>, e o alinhamento do ícone do <strong>Accordion</strong>,
        todos atualmente fixos em `left`/`right` físico em vez de lógico (`start`/`end`).
      </p>

      <h2 className="cp-docs-prose__h2">Formatação de números, moeda e datas</h2>
      <p className="cp-docs-prose__p">
        Nenhum componente do núcleo formata números, moeda ou datas automaticamente — essa
        responsabilidade é de quem constrói o ecrã, usando as capacidades nativas de{" "}
        <code className="cp-docs-prose__code">Intl</code> do JavaScript com a `locale` `pt-PT`
        (ex.: <code className="cp-docs-prose__code">Intl.NumberFormat(&quot;pt-PT&quot;, {"{"} style: &quot;currency&quot;, currency: &quot;EUR&quot; {"}"})</code>).
        Quando os componentes <strong>Date Picker</strong> e <strong>Number Input</strong> forem
        implementados numa fase seguinte, seguirão esta mesma convenção de locale explícita, nunca
        assumida a partir do idioma do navegador.
      </p>

      <h2 className="cp-docs-prose__h2">Se a internacionalização se tornar um requisito</h2>
      <p className="cp-docs-prose__p">
        A expansão para outros mercados da UE mencionada no posicionamento da Construct Plus não
        implica necessariamente múltiplos idiomas de interface — muitos mercados europeus B2B
        operam bem em inglês ou no idioma local com pequenas adaptações. Caso se torne necessário
        suportar múltiplos idiomas, recomenda-se introduzir uma biblioteca de i18n ao nível de
        cada aplicação (não do design system), mantendo os componentes agnósticos de idioma como
        estão hoje.
      </p>
    </article>
  );
}
