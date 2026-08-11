import type { Metadata } from "next";
import "@constructpluseu/react/styles.css";
import "./docs.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: {
    default: "Construct+ Design System",
    template: "%s — Construct+ Design System",
  },
  description:
    "Documentação oficial do Construct+ Design System: fundamentos, componentes, padrões e diretrizes para produtos Construct Plus em React, Vue, Angular e Next.js.",
};

// Aplica o tema guardado antes da primeira renderização visível, para evitar um
// flash do tema claro (predefinição) antes do JavaScript da página assumir o controlo.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("cp-docs-theme");
    document.documentElement.setAttribute("data-theme", stored === "dark" ? "dark" : "light");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="cp-docs-shell">
          <Sidebar />
          <main className="cp-docs-main">{children}</main>
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}
