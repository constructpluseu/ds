import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fundamentos" };

const items = [["cor","Cor"],["tipografia","Tipografia"],["espacamento","Espaçamento"],["grid-e-layout","Grid e layout"],["icones","Ícones"],["motion","Motion"],["elevacao-e-sombra","Elevação e sombra"],["temas","Temas"],["breakpoints","Breakpoints"]];

export default function FundamentosIndexPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Fundamentos</h1>
      <p className="cp-docs-prose__p">
        Os tokens e princípios visuais que sustentam todos os componentes do Construct+ Design
        System.
      </p>
      <div className="cp-docs-index-grid">
        {items.map(([slug, label]) => (
          <Link key={slug} href={`/fundamentos/${slug}`} className="cp-docs-index-card">
            <span className="cp-docs-index-card__title">{label}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}
