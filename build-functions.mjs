import * as esbuild from "esbuild";
import path from "path";

await esbuild.build({
  entryPoints: ["netlify/functions/api.mts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "netlify/functions-dist/api.mjs",
  packages: "external",
  alias: {
    "@shared": path.resolve("shared"),
  },
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`,
  },
});

console.log("Netlify function built successfully");
