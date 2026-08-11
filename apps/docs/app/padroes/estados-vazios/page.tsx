import type { Metadata } from "next";

export const metadata: Metadata = { title: "Estados vazios" };

const tipos = [
  {
    tipo: "Primeira utilização",
    quando: "Nenhum registo foi criado ainda (ex.: conta nova, sem obras).",
    conteudo: "Explica o que aparecerá ali e oferece a ação principal para criar o primeiro registo.",
  },
  {
    tipo: "Filtro sem resultados",
    quando: "Existem registos, mas a pesquisa ou os filtros ativos não encontraram nenhum.",
    conteudo: "Confirma que a pesquisa correu e sugere limpar ou ajustar os filtros — nunca sugere “criar”.",
  },
  {
    tipo: "Erro ao carregar",
    quando: "Os dados não puderam ser obtidos (falha de rede, servidor).",
    conteudo: "Explica que houve um problema técnico e oferece tentar novamente.",
  },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Estados vazios</h1>
      <p className="cp-docs-prose__p">
        Uma lista, tabela ou árvore sem itens não deve mostrar apenas um espaço em branco. Um bom
        estado vazio confirma que a aplicação funcionou como esperado e orienta o próximo passo —
        e os três tipos abaixo não são intermutáveis: cada um comunica uma causa diferente.
      </p>

      <h2 className="cp-docs-prose__h2">Três causas, três mensagens diferentes</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Quando ocorre</th>
            <th>O que comunicar</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((linha) => (
            <tr key={linha.tipo}>
              <td>
                <strong>{linha.tipo}</strong>
              </td>
              <td>{linha.quando}</td>
              <td>{linha.conteudo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Anatomia</h2>
      <p className="cp-docs-prose__p">
        Título curto (o que falta) + uma frase de apoio (porquê ou o que fazer) + no máximo uma
        ação. Evite ilustrações elaboradas que atrasem o carregamento percebido — um ícone simples
        ou nenhum é suficiente.
      </p>

      <h2 className="cp-docs-prose__h2">Onde este padrão já está incorporado</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Data Table</strong> e <strong>Structured List</strong> aceitam uma prop{" "}
          <code className="cp-docs-prose__code">emptyMessage</code> — use-a para o texto do estado
          &ldquo;filtro sem resultados&rdquo;, que é o caso mais comum dentro de uma tabela já
          carregada.
        </li>
        <li>
          Para o estado de &ldquo;primeira utilização&rdquo; de uma página inteira (não só uma
          tabela), construa um bloco dedicado com título, texto de apoio e um{" "}
          <strong>Button</strong> primário — este design system não impõe um componente único para
          isso, porque o conteúdo varia demasiado por contexto.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Conteúdo</h2>
      <ul className="cp-docs-prose__ul">
        <li>Seja específico: &ldquo;Sem obras registadas.&rdquo;, não &ldquo;Sem dados.&rdquo;</li>
        <li>
          No caso de filtro sem resultados, mencione o filtro quando ajudar: &ldquo;Nenhuma obra
          corresponde a &lsquo;Cascais&rsquo;.&rdquo;
        </li>
        <li>
          Nunca culpe o utilizador (&ldquo;Não introduziu dados suficientes&rdquo;) — descreva o
          estado, não a causa presumida.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Busca e filtragem</strong> — o estado vazio de filtro é o resultado direto deste
          padrão.
        </li>
        <li>
          <strong>Estados de erro</strong> — para falhas técnicas, não confundir com ausência de
          dados.
        </li>
      </ul>
    </article>
  );
}
