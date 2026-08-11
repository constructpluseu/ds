import type { Metadata } from "next";

export const metadata: Metadata = { title: "Formulários" };

const camposEExemplos = [
  { componente: "Text Input", uso: "Texto curto de uma linha (nome da obra, morada)" },
  { componente: "Textarea", uso: "Texto livre mais longo (descrição, observações)" },
  { componente: "Select", uso: "Escolha única entre poucas opções fixas (≤7)" },
  { componente: "Combobox", uso: "Escolha (única ou múltipla) com filtro, em listas longas" },
  { componente: "Number Input", uso: "Quantidades, valores monetários, medidas" },
  { componente: "Date Picker", uso: "Uma data específica (prazo, vistoria)" },
  { componente: "Checkbox", uso: "Opções independentes (pode marcar várias ou nenhuma)" },
  { componente: "Radio Button", uso: "Escolha única sempre visível, entre 2–5 opções" },
  { componente: "Toggle", uso: "Ligar/desligar uma definição, com efeito imediato" },
  { componente: "File Uploader", uso: "Anexar documentos ou fotografias" },
];

export default function Page() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Formulários</h1>
      <p className="cp-docs-prose__p">
        Um formulário no Construct+ recolhe dados estruturados de uma obra, orçamento ou contacto.
        Este padrão define como combinar os componentes de campo para que qualquer formulário da
        plataforma se comporte de forma previsível, independentemente de quem o constrói.
      </p>

      <h2 className="cp-docs-prose__h2">Escolher o campo certo</h2>
      <p className="cp-docs-prose__p">
        Cada tipo de dado tem um componente correspondente — não improvise com um{" "}
        <strong>Text Input</strong> para tudo:
      </p>
      <table className="cp-docs-prose__table">
        <thead>
          <tr>
            <th>Componente</th>
            <th>Use quando o dado for…</th>
          </tr>
        </thead>
        <tbody>
          {camposEExemplos.map((linha) => (
            <tr key={linha.componente}>
              <td>
                <strong>{linha.componente}</strong>
              </td>
              <td>{linha.uso}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Estrutura e agrupamento</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Agrupe campos relacionados sob um subtítulo (ex.: &ldquo;Dados da obra&rdquo;,
          &ldquo;Dados de faturação&rdquo;) em vez de apresentar uma lista plana de dezenas de
          campos.
        </li>
        <li>
          Um campo por linha em ecrãs estreitos; em ecrãs largos, agrupe no máximo dois campos
          curtos e relacionados na mesma linha (ex.: código postal + localidade).
        </li>
        <li>
          A etiqueta (<code className="cp-docs-prose__code">label</code>) fica sempre visível
          acima do campo — nunca substitua a etiqueta pelo <code className="cp-docs-prose__code">placeholder</code>,
          que desaparece assim que o utilizador começa a escrever.
        </li>
        <li>
          Marque campos opcionais com &ldquo;(opcional)&rdquo; junto à etiqueta; não marque campos
          obrigatórios com asterisco sem explicar o símbolo — prefira assumir que a maioria é
          obrigatória e assinalar só as exceções.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Validação</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          Valide um campo <strong>ao sair dele</strong> (evento <em>blur</em>), não a cada tecla —
          exceto para regras que só fazem sentido em tempo real (ex.: contagem de caracteres
          restantes).
        </li>
        <li>
          Ao submeter, valide tudo de novo; se houver erros, mova o foco para o{" "}
          <strong>primeiro campo inválido</strong> e mostre todos os erros de uma vez, não um de
          cada vez.
        </li>
        <li>
          Use a prop <code className="cp-docs-prose__code">errorText</code> (disponível em todos os
          campos) para a mensagem específica do campo — nunca substitua por um alerta genérico
          no topo da página sem também assinalar o campo.
        </li>
        <li>
          Mensagens de erro dizem o que fazer para corrigir, não só o que está errado: &ldquo;Introduza
          um NIF com 9 dígitos&rdquo;, não &ldquo;NIF inválido&rdquo;.
        </li>
      </ul>

      <h2 className="cp-docs-prose__h2">Ações do formulário</h2>
      <p className="cp-docs-prose__p">
        A ação principal (&ldquo;Guardar&rdquo;, &ldquo;Criar obra&rdquo;) usa sempre a variante
        primária do <strong>Button</strong> e fica à direita num formulário em ecrã largo; a ação
        secundária (&ldquo;Cancelar&rdquo;) usa a variante <em>ghost</em> ou secundária e fica à
        esquerda da principal. Nunca coloque duas ações primárias lado a lado.
      </p>

      <h2 className="cp-docs-prose__h2">Ver também</h2>
      <ul className="cp-docs-prose__ul">
        <li>
          <strong>Estados de erro</strong> — comportamento detalhado de erros ao nível do formulário.
        </li>
        <li>
          <strong>Diálogos</strong> — quando pedir confirmação antes de descartar um formulário
          com alterações não guardadas.
        </li>
      </ul>
    </article>
  );
}
