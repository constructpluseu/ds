import type { Metadata } from "next";

export const metadata: Metadata = { title: "Estados de erro" };

const niveis = [
  {
    nivel: "Campo",
    exemplo: "NIF com formato inválido",
    componente: "errorText do próprio campo",
  },
  {
    nivel: "Formulário",
    exemplo: "Vários campos por corrigir ao submeter",
    componente: "errorText em cada campo + foco no primeiro inválido",
  },
  {
    nivel: "Ação isolada",
    exemplo: "Falha ao guardar, ao remover um anexo",
    componente: "Notification (toast) do tipo erro",
  },
  {
    nivel: "Página/sistema",
    exemplo: "Falha de rede, servidor indisponível",
    componente: "Notification inline persistente na página",
  },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Estados de erro</h1>
      <p className="cp-docs-prose__p">
        Nem todos os erros têm o mesmo alcance. Este padrão define quatro níveis de erro e o
        componente correto para cada um — usar o nível errado (ex.: um toast para um erro de
        campo) faz o utilizador perder o contexto do que precisa de corrigir.
      </p>

      <h2 className="cp-docs-prose__h2">Os quatro níveis</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Nível</th>
            <th>Exemplo</th>
            <th>Como comunicar</th>
          </tr>
        </thead>
        <tbody>
          {niveis.map((linha) => (
            <tr key={linha.nivel}>
              <td>
                <strong>{linha.nivel}</strong>
              </td>
              <td>{linha.exemplo}</td>
              <td>{linha.componente}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Erros de campo e de formulário</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Cada campo com valor inválido usa a sua própria prop{" "}
          <code className="cp-docs-prose__code">errorText</code> — o campo fica com contorno
          vermelho e <code className="cp-docs-prose__code">aria-invalid=&quot;true&quot;</code>{" "}
          automaticamente.
        </li>
        <li>
          Ao submeter um formulário com múltiplos erros, mostre-os todos de uma vez (não campo a
          campo, à medida que o utilizador avança) e mova o foco para o primeiro campo inválido.
        </li>
        <li>
          Não use um <strong>Notification</strong> genérico (&ldquo;Corrija os erros abaixo&rdquo;)
          como substituto do <code className="cp-docs-prose__code">errorText</code> por campo — os
          dois não competem, um orienta para o formulário, o outro identifica o campo exato.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Erros de ação e de sistema</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Uma ação isolada que falha (guardar, remover, submeter) usa um{" "}
          <strong>toast de erro</strong> — breve, não bloqueia a interface, e nomeia a ação que
          falhou: &ldquo;Não foi possível guardar o orçamento.&rdquo;
        </li>
        <li>
          Uma falha que impede o uso de uma página inteira (sem ligação, servidor em baixo) usa
          uma <strong>notificação inline persistente</strong> no topo da página, que só desaparece
          quando o problema é resolvido — nunca um toast que desaparece sozinho para este caso.
        </li>
        <li>
          Ofereça sempre uma saída: um botão &ldquo;Tentar novamente&rdquo; quando a ação for
          repetível.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Conteúdo</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Diga o que aconteceu e o que fazer, em pt-PT direto: &ldquo;Não foi possível carregar as
          obras. Verifique a ligação e tente novamente.&rdquo;
        </li>
        <li>Nunca exponha mensagens técnicas em bruto (stack traces, códigos HTTP) ao utilizador final.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Formulários</strong> — regras completas de validação de campo.
        </li>
        <li>
          <strong>Notificações</strong> — anatomia e comportamento de toasts e notificações inline.
        </li>
      </ul>
    </article>
  );
}
