import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/packages/index.ts"),
      name: "CoreidUtil",
      // the proper extensions will be added
      fileName: "coreid-util",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "react",
        "react-dom",
        "js-conflux-sdk",
        "bignumber.js",
        "buffer",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "react",
          "react-dom": "react-dom",
          "js-conflux-sdk": "js-conflux-sdk",
          "bignumber.js": "bignumber.js",
          buffer: "buffer",
        },
      },
    },
  },
});
