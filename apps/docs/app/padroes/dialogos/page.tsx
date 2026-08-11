import type { Metadata } from "next";

export const metadata: Metadata = { title: "Diálogos" };

const escolha = [
  { situacao: "Confirmar uma ação destrutiva (remover obra)", componente: "Modal" },
  { situacao: "Formulário curto e independente (criar tag rápida)", componente: "Modal" },
  { situacao: "Ajuda contextual sobre um termo ou ícone", componente: "Tooltip" },
  { situacao: "Ajuda contextual mais longa, acionada por clique", componente: "Toggletip" },
  { situacao: "Lista curta de ações sobre um item", componente: "Dropdown Menu" },
  { situacao: "Conteúdo rico não modal, ligado a um elemento", componente: "Popover" },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Diálogos</h1>
      <p className="cp-docs-prose__p">
        &ldquo;Diálogo&rdquo; é qualquer conteúdo que interrompe ou se sobrepõe ao fluxo principal
        para pedir uma decisão ou mostrar informação adicional. O Construct+ Design System tem
        vários componentes para isto — escolher o errado é uma das fontes mais comuns de
        inconsistência num produto.
      </p>

      <h2 className="cp-docs-prose__h2">Qual componente usar</h2>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Situação</th>
            <th>Componente</th>
          </tr>
        </thead>
        <tbody>
          {escolha.map((linha) => (
            <tr key={linha.situacao}>
              <td>{linha.situacao}</td>
              <td>
                <strong>{linha.componente}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Modal: quando bloquear o ecrã</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Use <strong>Modal</strong> só quando a tarefa exige atenção total e uma decisão explícita
          antes de continuar — confirmações destrutivas, formulários curtos que não justificam uma
          página própria.
        </li>
        <li>
          Ações destrutivas (remover, arquivar em definitivo) pedem sempre confirmação explícita
          num Modal, com o botão destrutivo claramente distinto do botão de cancelar (nunca os
          dois com a mesma variante visual).
        </li>
        <li>
          Não encadeie modais — um Modal que abre outro Modal confunde a pilha de foco e de
          <code className="cp-docs-prose__code">Escape</code>. Feche o primeiro antes de abrir o
          seguinte.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Alternativas mais leves</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Se a ação não é destrutiva e pode ser desfeita facilmente (ex.: remover um item de uma
          lista com um &ldquo;Anular&rdquo; disponível), prefira um <strong>toast</strong> (ver{" "}
          <strong>Notificações</strong>) a um Modal de confirmação — menos interrupção para o mesmo
          resultado.
        </li>
        <li>
          Para mostrar mais detalhe sobre um item sem sair da página, use <strong>Popover</strong>{" "}
          antes de recorrer a um Modal.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Comportamento comum</h2>
      <ul className="cp-docs-prose__ul">
        <li>Todo o conteúdo sobreposto (Modal, Popover, Menu, Toggletip) fecha com <code className="cp-docs-prose__code">Escape</code> e ao clicar fora.</li>
        <li>O foco desloca-se para dentro do diálogo ao abrir e regressa ao elemento que o acionou ao fechar.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Notificações</strong> — alternativa não bloqueante para confirmar ações.
        </li>
      </ul>
    </article>
  );
}
