import StyleDictionary from "style-dictionary";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distCss = path.join(root, "dist/css");
const distComponents = path.join(distCss, "components");

fs.mkdirSync(distCss, { recursive: true });
fs.mkdirSync(distComponents, { recursive: true });

const banner =
  "/**\n * Construct+ Design System — tokens gerados automaticamente.\n * Não edite este ficheiro à mão: a fonte está em packages/tokens/src/**.\n */\n";

// --- 1. Tema claro (todas as categorias de tokens) ---
const sdLight = new StyleDictionary({
  source: [
    "src/color/base.json",
    "src/color/semantic.json",
    "src/typography/font.json",
    "src/spacing.json",
    "src/radius.json",
    "src/shadow.json",
    "src/motion.json",
    "src/breakpoints.json",
    "src/zindex.json",
  ],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "cp",
      buildPath: "dist/css/",
      files: [
        {
          destination: "tokens-light.css",
          format: "css/variables",
          options: { selector: ":root", outputReferences: true },
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      prefix: "cp",
      buildPath: "dist/scss/",
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/variables",
          options: { outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        { destination: "tokens.js", format: "javascript/es6" },
        { destination: "tokens.d.ts", format: "typescript/es6-declarations" },
      ],
    },
    json: {
      transformGroup: "js",
      buildPath: "dist/json/",
      files: [{ destination: "tokens.json", format: "json/flat" }],
    },
  },
});

await sdLight.buildAllPlatforms();

// --- 2. Tema escuro (apenas overrides semânticos de cor) ---
const sdDark = new StyleDictionary({
  source: ["src/color/base.json", "src/themes/dark.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "cp",
      buildPath: "dist/css/",
      files: [
        {
          destination: "tokens-dark.css",
          format: "css/variables",
          options: { selector: '[data-theme="dark"]', outputReferences: true },
          filter: (token) => token.path[0] === "color" && token.path[1] === "semantic",
        },
      ],
    },
  },
});

await sdDark.buildAllPlatforms();

// --- 3. Concatenar tokens-light.css + tokens-dark.css -> tokens.css ---
const light = fs.readFileSync(path.join(distCss, "tokens-light.css"), "utf8");
const dark = fs.readFileSync(path.join(distCss, "tokens-dark.css"), "utf8");
fs.writeFileSync(path.join(distCss, "tokens.css"), banner + light + "\n" + dark);
fs.rmSync(path.join(distCss, "tokens-light.css"));
fs.rmSync(path.join(distCss, "tokens-dark.css"));

// --- 4. Copiar reset.css (escrito à mão, não gerado pelo Style Dictionary) ---
fs.copyFileSync(path.join(root, "reset.css"), path.join(distCss, "reset.css"));

// --- 5. Concatenar CSS de componentes (packages/tokens/src/components/*.css) ---
const componentsDir = path.join(root, "src/components");
const componentFiles = fs.existsSync(componentsDir)
  ? fs.readdirSync(componentsDir).filter((f) => f.endsWith(".css")).sort()
  : [];

let componentsBundle = banner;
for (const file of componentFiles) {
  const content = fs.readFileSync(path.join(componentsDir, file), "utf8");
  componentsBundle += `\n/* ---- ${file} ---- */\n${content}`;
  fs.copyFileSync(path.join(componentsDir, file), path.join(distComponents, file));
}
fs.writeFileSync(path.join(distCss, "components.css"), componentsBundle);

console.log(
  `Tokens construídos: tokens.css, reset.css, components.css (${componentFiles.length} componente(s)), scss, js, json.`
);
