import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  // Regenera dist/styles.css a cada build — incluindo rebuilds em --watch — para que
  // `pnpm dev` propague alterações a tokens/CSS de componentes sem precisar de um
  // `pnpm build` manual antes.
  onSuccess: "node scripts/copy-styles.mjs",
});
