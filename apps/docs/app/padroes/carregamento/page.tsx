import type { Metadata } from "next";

export const metadata: Metadata = { title: "Carregamento" };

const escolha = [
  { situacao: "Primeiro carregamento de uma lista/tabela/cartão", componente: "Skeleton", motivo: "Mostra a forma do conteúdo antes de existir, reduz a perceção de espera" },
  { situacao: "Ação pontual com duração curta e imprevisível (guardar, submeter)", componente: "Loading Spinner", motivo: "Comunica “em curso” sem prometer uma duração" },
  { situacao: "Processo com duração conhecida ou etapas (upload de vários ficheiros)", componente: "Progress Bar", motivo: "Mostra progresso real, reduz ansiedade em tarefas longas" },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Carregamento</h1>
      <p className="cp-docs-prose__p">
        Três componentes cobrem estados de carregamento — <strong>Skeleton</strong>,{" "}
        <strong>Loading Spinner</strong> e <strong>Progress Bar</strong> — e cada um responde a uma
        pergunta diferente do utilizador: &ldquo;o que vai aparecer aqui?&rdquo;, &ldquo;está a
        acontecer alguma coisa?&rdquo; ou &ldquo;quanto falta?&rdquo;.
      </p>

      <h2 className="cp-docs-prose__h2">Qual usar</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Situação</th>
            <th>Componente</th>
            <th>Porquê</th>
          </tr>
        </thead>
        <tbody>
          {escolha.map((linha) => (
            <tr key={linha.situacao}>
              <td>{linha.situacao}</td>
              <td>
                <strong>{linha.componente}</strong>
              </td>
              <td>{linha.motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Skeleton: carregamento inicial</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          A forma do Skeleton deve aproximar-se da forma real do conteúdo final (linhas de texto,
          avatares, cartões) para que a transição não &ldquo;salte&rdquo; quando os dados chegam.
        </li>
        <li>
          Use Skeleton só no <strong>primeiro</strong> carregamento de uma vista. Em recarregamentos
          subsequentes (ex.: mudar de página numa tabela já visível), prefira um indicador mais
          discreto para não repetir uma transição visual grande a cada interação.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Loading Spinner: ações pontuais</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Um botão que dispara uma ação assíncrona substitui o seu próprio texto por um Loading
          Spinner e fica desativado durante a operação, para impedir duplo envio.
        </li>
        <li>
          Não use um Loading Spinner de página inteira para operações que demoram poucos
          milissegundos — só introduz um piscar visual sem benefício.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Progress Bar: processos longos</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Sempre que for possível calcular uma percentagem real (upload de ficheiros, importação em
          lote), use <strong>Progress Bar</strong> em vez de um spinner indeterminado — a
          expectativa de tempo restante reduz a perceção de espera.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Acessibilidade</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Todos os indicadores de carregamento comunicam o estado a leitores de ecrã (
          <code className="cp-docs-prose__code">role=&quot;status&quot;</code> ou equivalente) —
          não dependa só da animação visual.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Estados vazios</strong> — o que mostrar depois de o carregamento terminar sem
          resultados.
        </li>
      </ul>
    </article>
  );
}
