import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      formats: ["umd"],
      entry: resolve(__dirname, "index.ts"),
      fileName: "ts-monads",
      name: "monads",
    },
    sourcemap: true,
    outDir: "dist",
  },
  plugins: [dts()],
});
