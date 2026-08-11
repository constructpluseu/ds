import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Padrões" };

const items = [["formularios","Formulários"],["estados-vazios","Estados vazios"],["estados-de-erro","Estados de erro"],["notificacoes","Notificações"],["busca-e-filtragem","Busca e filtragem"],["dialogos","Diálogos"],["carregamento","Carregamento"]];

export default function PadroesIndexPage() {
  return (
    <article>
      <h1 className="cp-docs-prose__h1">Padrões</h1>
      <p className="cp-docs-prose__p">
        Composições de vários componentes que resolvem objetivos recorrentes na plataforma
        Construct+ — quando combinar Search com filtros, qual diálogo escolher, como estruturar um
        formulário. Cada padrão indica os componentes envolvidos e as regras de comportamento e
        conteúdo específicas dessa combinação.
      </p>
      <div className="cp-docs-index-grid">
        {items.map(([slug, label]) => (
          <Link key={slug} href={`/padroes/${slug}`} className="cp-docs-index-card">
            <span className="cp-docs-index-card__title">{label}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}
