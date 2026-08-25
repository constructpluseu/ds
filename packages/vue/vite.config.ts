import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

/**
 * Regenera dist/styles.css a cada build — incluindo rebuilds em --watch — para que
 * `pnpm dev` propague alterações a tokens/CSS de componentes sem precisar de um
 * `pnpm build` manual antes. closeBundle corre depois da escrita do bundle, tanto
 * no build único como em cada rebuild do modo --watch.
 */
function copyStylesPlugin(): Plugin {
  return {
    name: "copy-styles",
    closeBundle() {
      execFileSync("node", ["scripts/copy-styles.mjs"], { cwd: __dirname, stdio: "inherit" });
    },
  };
}

export default defineConfig({
  plugins: [vue(), dts({ include: ["src"], insertTypesEntry: true }), copyStylesPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ConstructPlusVue",
      fileName: (format) => `constructplus-vue.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
