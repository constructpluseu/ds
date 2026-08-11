import type { Metadata } from "next";

export const metadata: Metadata = { title: "Busca e filtragem" };

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Busca e filtragem</h1>
      <p className="cp-docs-prose__p">
        Encontrar uma obra, um material ou uma fatura numa lista longa combina normalmente dois
        mecanismos complementares: uma <strong>procura livre</strong> por texto e{" "}
        <strong>filtros estruturados</strong> por critérios conhecidos (estado, tipo, intervalo de
        datas). Este padrão define como combiná-los sobre uma lista ou <strong>Data Table</strong>.
      </p>

      <h2 className="cp-docs-prose__h2">Procura livre vs. filtros</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Search</strong>: para texto livre sem estrutura conhecida à partida (nome da
          obra, morada). Filtra por correspondência parcial no(s) campo(s) relevantes.
        </li>
        <li>
          <strong>Select</strong>/<strong>Combobox</strong> (para uma opção) ou{" "}
          <strong>Checkbox</strong> (para várias): para critérios com um conjunto fechado de
          valores — estado da obra, tipo de intervenção.
        </li>
        <li>
          <strong>Date Picker</strong> (par de campos &ldquo;de&rdquo;/&ldquo;até&rdquo;): para
          filtrar por intervalo de datas.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Disposição</h2>
      <p className="cp-docs-prose__p">
        Coloque a <strong>Search</strong> em destaque acima da lista/tabela; os filtros estruturados
        ficam ao lado ou por baixo, num grupo compacto. Em ecrãs estreitos, os filtros podem
        recolher para um <strong>Modal</strong> ou <strong>Popover</strong> acionado por um botão
        &ldquo;Filtrar&rdquo;, para não empurrar os resultados para fora do ecrã visível.
      </p>

      <h2 className="cp-docs-prose__h2">Comportamento</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Aplique a procura e os filtros em conjunto (E lógico) — nunca em substituição um do
          outro.
        </li>
        <li>
          Mostre sempre quantos resultados foram encontrados (&ldquo;12 obras encontradas&rdquo;)
          para confirmar que a filtragem funcionou, especialmente quando o número é pequeno.
        </li>
        <li>
          Cada filtro ativo pode ser representado como uma <strong>Tag</strong> removível acima
          dos resultados, com uma ação &ldquo;Limpar filtros&rdquo; quando houver mais do que um
          ativo.
        </li>
        <li>
          Quando a combinação de procura e filtros não devolve nada, siga o padrão de{" "}
          <strong>Estados vazios</strong> — tipo &ldquo;filtro sem resultados&rdquo;, nunca o de
          &ldquo;primeira utilização&rdquo;.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Combinação com o Data Table</h2>
      <p className="cp-docs-prose__p">
        A <strong>Data Table</strong> não filtra os seus próprios dados — a aplicação aplica a
        procura/filtros aos <code className="cp-docs-prose__code">rows</code> antes de os passar ao
        componente, exatamente como já faz para a ordenação (ver a documentação do componente).
        Isto mantém a lógica de filtragem centralizada e reutilizável entre tabela e outras vistas
        (ex.: cartões).
      </p>

      <h2 className="cp-docs-prose__h2">Conteúdo</h2>
      <ul className="cp-docs-prose__ul">
        <li>O campo de procura nomeia o que se procura: &ldquo;Procurar obras&rdquo;, não &ldquo;Pesquisar&rdquo; genérico.</li>
        <li>Rótulos de filtro usam o vocabulário do domínio (&ldquo;Estado da obra&rdquo;), não termos técnicos internos.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Estados vazios</strong> — o que mostrar quando a combinação de filtros não
          encontra nada.
        </li>
      </ul>
    </article>
  );
}
