import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notificações" };

const comparacao = [
  { aspeto: "Duração", toast: "Desaparece sozinho (alguns segundos)", inline: "Fica até ser fechada ou resolvida" },
  { aspeto: "Posição", toast: "Sobreposta, canto do ecrã", inline: "Dentro do fluxo da página" },
  { aspeto: "Bloqueia interação", toast: "Não", inline: "Não, mas ocupa espaço permanente" },
  { aspeto: "Uso típico", toast: "Confirmação de uma ação pontual", inline: "Estado persistente de uma página/secção" },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Notificações</h1>
      <p className="cp-docs-prose__p">
        O componente <strong>Notification</strong> tem duas formas — <em>toast</em> e{" "}
        <em>inline</em> — que não são estilos alternativos da mesma coisa, mas respostas a
        perguntas diferentes: &ldquo;o que acabou de acontecer?&rdquo; (toast) versus &ldquo;qual é
        o estado atual desta página?&rdquo; (inline).
      </p>

      <h2 className="cp-docs-prose__h2">Toast vs. inline</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Aspeto</th>
            <th>Toast</th>
            <th>Inline</th>
          </tr>
        </thead>
        <tbody>
          {comparacao.map((linha) => (
            <tr key={linha.aspeto}>
              <td>
                <strong>{linha.aspeto}</strong>
              </td>
              <td>{linha.toast}</td>
              <td>{linha.inline}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Quando usar cada uma</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Toast</strong>: confirmar que uma ação pontual foi concluída (&ldquo;Obra criada
          com sucesso&rdquo;, &ldquo;Ficheiro removido&rdquo;) ou que falhou (ver{" "}
          <strong>Estados de erro</strong>).
        </li>
        <li>
          <strong>Inline</strong>: comunicar um estado que persiste enquanto a página estiver
          aberta — um plano a expirar, uma sincronização em curso, uma obra arquivada que está a
          ser visualizada em modo só de leitura.
        </li>
        <li>
          Nunca use um toast para informação que o utilizador precisa de reler mais tarde — ele
          desaparece sozinho e não fica disponível para consulta.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Empilhamento e limite</h2>
      <ul className="cp-docs-prose__ul">
        <li>Vários toasts empilham-se, o mais recente no topo; não hesite em substituir um toast redundante por um mais atual da mesma ação.</li>
        <li>
          Evite mostrar mais do que uma notificação inline do mesmo tipo na mesma página — se há
          duas situações a comunicar, combine-as numa só mensagem.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Conteúdo</h2>
      <ul className="cp-docs-prose__ul">
        <li>Uma frase, no passado para confirmações (&ldquo;Orçamento enviado.&rdquo;) e no presente para estados em curso (&ldquo;A sincronizar dados da obra…&rdquo;).</li>
        <li>Inclua uma ação quando fizer sentido (&ldquo;Anular&rdquo;, &ldquo;Ver obra&rdquo;) em vez de forçar o utilizador a navegar manualmente para confirmar o efeito.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Estados de erro</strong> — quando o conteúdo da notificação é uma falha.
        </li>
      </ul>
    </article>
  );
}
