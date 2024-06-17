// rollup.config.mjs

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { readFileSync } from 'fs';

// Read package.json as an ES module
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

// Rollup configuration
export default [
  {
    input: "src/index.ts",  // Entry point for your library
    output: [
      {
        file: packageJson.main,  // Output file for CommonJS
        format: "cjs",  // CommonJS format
        sourcemap: true  // Enable source maps
      },
      {
        file: packageJson.module,  // Output file for ES module
        format: "esm",  // ES module format
        sourcemap: true  // Enable source maps
      },
    ],
    plugins: [
      resolve(),  // Resolves node modules
      commonjs(),  // Converts CommonJS modules to ES6
      typescript({ tsconfig: "./tsconfig.json" }),  // Compiles TypeScript
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",  // Entry point for type definitions
    output: [{ file: "dist/index.d.ts", format: "esm" }],  // Output for type definitions
    plugins: [dts()],  // Plugin to handle TypeScript definitions
  }
];
