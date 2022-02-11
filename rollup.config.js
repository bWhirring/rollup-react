import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import terser from 'rollup-plugin-terser';
import path from 'path';
import fs from 'fs';
import copy from 'rollup-plugin-copy';

const isProd = process.env.NODE_ENV === 'production';

const pkg = require('./package.json');

const packages = {};

const dir = path.join(__dirname, '/components');
const files = fs.readdirSync(dir);
files.forEach((file) => {
  if (file !== 'index.ts') {
    packages[file] = `components/${file}/index.ts`;
  }
});

const entry = `index`;
packages[entry] = path.join(__dirname, '/components/index.ts');

const createRollupConfig = (file, name) => {
  const isEntry = name === entry;
  return {
    input: file,
    output: [
      {
        file: isEntry ? pkg.main : `lib/${name}/index.js`,
        format: 'cjs',
        name: 'rollup-library',
        exports: 'auto',
        sourcemap: true
      },
      {
        file: isEntry ? pkg.module : `es/${name}/index.js`,
        format: 'esm',
        exports: 'auto',
        sourcemap: true
      }
    ],
    external: ['react'],
    plugins: [
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigDefaults: {
          compilerOptions: {
            declaration: isEntry
          }
        }
        // tsconfigOverride: override
      }),
      resolve(),
      postcss({
        modules: true,
        // 单独打包css文件默认false
        extract: true,
        // Minimize CSS, boolean or options for cssnano.
        minimize: isProd,
        // Enable sourceMap.
        sourceMap: !isProd,
        // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
        extensions: ['.less', '.css']
      }),
      !isEntry &&
        copy({
          targets: [
            { src: `components/${name}/index.less`, dest: `es/${name}` },
            { src: `components/${name}/index.less`, dest: `lib/${name}` }
          ]
        }),
      isProd && terser()
    ]
  };
};

const buildPackages = [];
Object.keys(packages).forEach((name) => {
  const file = packages[name];
  buildPackages.push(createRollupConfig(file, name));
});

export default buildPackages;

// export default [config];
