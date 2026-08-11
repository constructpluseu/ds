import type { Metadata } from "next";
import "@constructpluseu/react/styles.css";

export const metadata: Metadata = {
  title: "Construct+ Design System — demonstração Next.js",
  description: "App de exemplo que consome @constructpluseu/react dentro do App Router.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
