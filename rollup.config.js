import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";

import copy from "rollup-plugin-copy";
const packageJson = require("./package.json");

const fs = require("fs");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const packages = {};
const dir = path.join(__dirname, "/components");
const files = fs.readdirSync(dir);
files.forEach((file) => {
  if (file !== "index.ts") {
    packages[file] = `components/${file}/index.tsx`;
  }
});

const pkg = require("./package.json");

const all = `index`;
packages[all] = path.join(__dirname, "/components/index.ts");

// export default [
//   {
//     input: "components/index.ts",
//     output: [
//       {
//         file: packageJson.main,
//         format: "cjs",
//         name: "react-ts-lib"
//       },
//       {
//         file: packageJson.module,
//         format: "esm"
//       }
//     ],
//     external: ["react"],
//     plugins: [
//       external(),
//       resolve(),
//       commonjs(),
//       typescript(),
//       postcss()
//       // terser()
//     ]
//   }
// ];

function createRollupConfig(file, name) {
  const config = {
    input: file,
    output: [
      {
        file: name === all ? packageJson.main : `lib/${name}/index.js`,
        format: "cjs",
        name: "react-ts-lib"
      },
      {
        file: name === all ? packageJson.module : `es/${name}/index.js`,
        format: "esm"
      }
    ],
    external: ["react"],
    plugins: [
      name === all &&
        typescript({
          include: ["components/*.ts+(|x)", "components/**/*.ts+(|x)"],
          typescript: require("typescript")
        }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        // babel 默认不支持 ts 需要手动添加
        extensions: [".ts", ".tsx"]
      }),
      nodeResolve(),
      // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
      commonjs(),
      postcss({
        // 单独打包css文件默认false
        extract: true,
        // Minimize CSS, boolean or options for cssnano.
        minimize: isProd,
        // Enable sourceMap.
        sourceMap: !isProd,
        // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
        extensions: [".less", ".css"],
        use: [
          [
            "less",
            {
              javascriptEnabled: true,
              modifyVars: { "@primary-color": "#42b983" }
            }
          ]
        ]
      }),
      name !== all &&
        copy({
          targets: [
            { src: `components/${name}/index.less`, dest: `es/${name}` },
            { src: `components/${name}/index.less`, dest: `lib/${name}` }
          ]
        })
    ]
  };
  return config;
}

const buildPackages = [];
console.log(packages, "packagespackages");
Object.keys(packages).forEach((name) => {
  const file = packages[name];
  buildPackages.push(createRollupConfig(file, name));
});

console.log(buildPackages, "buildPackages");

export default buildPackages;
