import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const tokensDist = path.resolve(root, "../tokens/dist/css");
const outFile = path.join(root, "dist/styles.css");

const files = ["tokens.css", "reset.css", "components.css"];
let bundle =
  "/**\n * Construct+ Design System — Angular\n * Estilos gerados a partir de @constructpluseu/tokens.\n * Referenciar em angular.json > styles (ou importar globalmente na app).\n */\n\n";

for (const file of files) {
  bundle += fs.readFileSync(path.join(tokensDist, file), "utf8") + "\n";
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, bundle);
console.log("dist/styles.css gerado a partir de @constructpluseu/tokens.");
