import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "@rollup-plugin-dts";

const packageJson = require("./package.json");

export default  [
    {
        input: "src/index.ts",
        output: [
            {
                File: packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                File: packageJson.module,
                format: "esm",
                sourcemap: true
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json"}),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],
    }
];