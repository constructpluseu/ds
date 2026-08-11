import Link from "next/link";
import type { Metadata } from "next";
import { componentCategories, getComponentsByCategory } from "@/lib/component-registry";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata: Metadata = { title: "Componentes" };

export default function ComponentsIndexPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Componentes</h1>
      <p className="cp-docs-prose__p">
        Peças de interface reutilizáveis do Construct+ Design System, organizadas por categoria.
        Componentes <StatusBadge status="disponivel" /> já podem ser usados; componentes{" "}
        <StatusBadge status="planeado" /> estão especificados mas ainda não implementados.
      </p>

      {componentCategories.map((categoria) => (
        <section key={categoria}>
          <h2 className="cp-docs-prose__h2">{categoria}</h2>
          <div className="cp-docs-index-grid">
            {getComponentsByCategory(categoria).map((c) => (
              <Link key={c.slug} href={`/componentes/${c.slug}`} className="cp-docs-index-card">
                <span className="cp-docs-index-card__title">
                  {c.nome}
                  <StatusBadge status={c.status} />
                </span>
                <span className="cp-docs-index-card__desc">{c.descricao}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
