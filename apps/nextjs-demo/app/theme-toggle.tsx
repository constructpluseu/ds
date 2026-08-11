"use client";

import { useEffect, useState } from "react";
import { Button } from "@constructpluseu/react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("cp-theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("cp-theme", next);
  }

  return (
    <Button variant="secondary" size="sm" onClick={toggle}>
      Tema: {theme === "light" ? "claro" : "escuro"}
    </Button>
  );
}
