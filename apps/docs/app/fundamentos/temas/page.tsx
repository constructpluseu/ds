import type { Metadata } from "next";

export const metadata: Metadata = { title: "Temas" };

export default function TemasPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Temas</h1>
      <p className="cp-docs-prose__p">
        O Construct+ Design System suporta tema claro e escuro nativamente, através de um único
        atributo no elemento raiz do documento: <code className="cp-docs-prose__code">data-theme</code>.
        Nenhum componente precisa de saber qual o tema ativo — todos consomem apenas tokens
        semânticos, que resolvem automaticamente para o valor certo.
      </p>

      <h2 className="cp-docs-prose__h2">Como ativar</h2>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`<html lang="pt-PT" data-theme="dark">
  ...
</html>`}</code>
      </pre>
      <p className="cp-docs-prose__p">
        Omitir o atributo (ou definir <code className="cp-docs-prose__code">data-theme=&quot;light&quot;</code>)
        usa o tema claro, que é o predefinido em toda a documentação e nas apps de exemplo.
      </p>

      <h2 className="cp-docs-prose__h2">O que muda entre temas</h2>
      <p className="cp-docs-prose__p">
        Apenas a <strong>camada semântica de cor</strong> muda — tipografia, espaçamento, raio e
        motion são idênticos em ambos os temas. Isto significa que qualquer componente construído
        corretamente com tokens semânticos (nunca cor da paleta base diretamente) funciona nos dois
        temas sem alteração de código.
      </p>
      <ul className="cp-docs-prose__ul">
        <li>Fundos invertem: <code className="cp-docs-prose__code">bg.canvas</code> passa de quase-branco a azul-marinho muito escuro.</li>
        <li>A cor de marca (<code className="cp-docs-prose__code">bg.brand</code>) passa de navy (tema claro) para verde-menta (tema escuro) — no tema escuro, o navy já é a cor de fundo, por isso a marca usa o verde para se manter visível e vibrante.</li>
        <li>Bordas passam de cinza sólido a branco translúcido (<code className="cp-docs-prose__code">rgba(255,255,255,.12)</code>), mais adequado sobre fundos escuros variáveis.</li>
      </ul>

      <h2 className="cp-docs-prose__h2">Implementar um alternador de tema</h2>
      <p className="cp-docs-prose__p">
        Um alternador de tema é apenas lógica da aplicação — não faz parte do design system em si.
        O padrão recomendado (demonstrado na app de exemplo Next.js) é guardar a preferência em{" "}
        <code className="cp-docs-prose__code">localStorage</code> e aplicar o atributo no cliente:
      </p>
      <pre className="cp-docs-codetabs__panel" style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)" }}>
        <code>{`function alternarTema() {
  const atual = document.documentElement.getAttribute("data-theme");
  const proximo = atual === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", proximo);
  localStorage.setItem("cp-theme", proximo);
}`}</code>
      </pre>
      <p className="cp-docs-prose__p">
        Ver também <strong>Diretrizes → Temas e modo escuro</strong> para recomendações de
        implementação por framework e como evitar flash de tema errado no carregamento inicial.
      </p>
    </article>
  );
}
