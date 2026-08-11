import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conteúdo e tom de voz" };

export default function ConteudoETomDeVozPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Conteúdo e tom de voz</h1>
      <p className="cp-docs-prose__p">
        Todo o texto de interface da Construct+ é escrito em <strong>português europeu (pt-PT)</strong>,
        com um tom <strong>direto, profissional e orientado a resultados</strong> — o mesmo
        registo usado no site institucional da marca, adaptado ao contexto de uma interface de
        produto (mais conciso, mais orientado à ação).
      </p>

      <h2 className="cp-docs-prose__h2">Princípios gerais</h2>
      <ul className="cp-docs-prose__ul">
        <li><strong>Sentence case, não Title Case:</strong> &ldquo;Avançar para orçamento&rdquo;, nunca &ldquo;Avançar Para Orçamento&rdquo;. Exceção: nomes próprios e siglas (RGPD, NIF, ESG).</li>
        <li><strong>Frases curtas e diretas:</strong> prefira &ldquo;Guardar obra&rdquo; a &ldquo;Clique aqui para guardar os dados da obra&rdquo;.</li>
        <li><strong>Voz ativa:</strong> &ldquo;O sistema guardou as alterações&rdquo;, não &ldquo;As alterações foram guardadas pelo sistema&rdquo;.</li>
        <li><strong>Trate o utilizador por &ldquo;você&rdquo; implícito (imperativo), nunca por &ldquo;tu&rdquo;:</strong> &ldquo;Selecione uma opção&rdquo;, nunca &ldquo;Seleciona uma opção&rdquo;. Mantém o registo profissional adequado a um produto B2B.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Rótulos de ação (botões, links)</h2>
      <ul className="cp-docs-prose__ul">
        <li>Comece sempre por um verbo no infinitivo: <strong>Guardar</strong>, <strong>Eliminar</strong>, <strong>Avançar</strong>, <strong>Cancelar</strong>.</li>
        <li>Seja específico quando o contexto tiver ambiguidade: <strong>&ldquo;Eliminar contrato&rdquo;</strong> em vez de apenas <strong>&ldquo;Eliminar&rdquo;</strong> num ecrã com múltiplas entidades.</li>
        <li>Evite rótulos genéricos como &ldquo;Clique aqui&rdquo;, &ldquo;Submeter&rdquo; ou &ldquo;OK&rdquo; sem contexto.</li>
        <li>Ações destrutivas usam sempre um verbo claro sobre a consequência (&ldquo;Eliminar&rdquo;), nunca eufemismos.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Mensagens de erro e ajuda</h2>
      <ul className="cp-docs-prose__ul">
        <li>Explique <strong>como corrigir</strong>, não apenas o que está errado: &ldquo;Introduza um NIF com 9 dígitos&rdquo;, não &ldquo;NIF inválido&rdquo;.</li>
        <li>Nunca culpe o utilizador: evite &ldquo;Você inseriu um valor errado&rdquo;.</li>
        <li>Texto de ajuda é preventivo (evita o erro); texto de erro é corretivo (resolve o erro já cometido) — não repita a mesma informação nos dois.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Vocabulário do domínio</h2>
      <p className="cp-docs-prose__p">
        Use sempre a terminologia real do setor da construção civil em Portugal, consistente com a
        linguagem da própria Construct Plus:
      </p>
      <table className="cp-docs-prose__table">
        <thead><tr><th>Termo preferido</th><th>Evitar</th></tr></thead>
        <tbody>
          <tr><td>Obra</td><td>Projeto (ambíguo com &ldquo;projeto técnico&rdquo;)</td></tr>
          <tr><td>Auto de receção</td><td>&ldquo;Formulário de conclusão&rdquo;</td></tr>
          <tr><td>Aprovisionamento</td><td>&ldquo;Compras&rdquo; (termo mais restrito)</td></tr>
          <tr><td>Fracionamento</td><td>&ldquo;Parcelamento&rdquo; (pt-BR)</td></tr>
          <tr><td>Pós-venda</td><td>&ldquo;Suporte&rdquo; (genérico demais)</td></tr>
        </tbody>
      </table>

      <h2 className="cp-docs-prose__h2">Notas de português europeu vs. brasileiro</h2>
      <p className="cp-docs-prose__p">
        Preste atenção a diferenças comuns: <strong>&ldquo;fatura&rdquo;</strong> (não
        &ldquo;nota fiscal&rdquo;), <strong>&ldquo;ecrã&rdquo;</strong> (não &ldquo;tela&rdquo;),{" "}
        <strong>&ldquo;ficheiro&rdquo;</strong> (não &ldquo;arquivo&rdquo;),{" "}
        <strong>&ldquo;telemóvel&rdquo;</strong> (não &ldquo;celular&rdquo;),{" "}
        <strong>&ldquo;utilizador&rdquo;</strong> (não &ldquo;usuário&rdquo;).
      </p>
    </article>
  );
}
