const esbuild = require('esbuild');

esbuild.buildSync({
  target: ['node14', 'es2020'],
  entryPoints: ['src/index.ts', 'src/child.ts'],
  platform: 'node',
  outdir: 'dist/src',
  bundle: true,
  minify: true,
  external: ['js-library-detector/library/libraries.js', 'lighthouse'],
  legalComments: 'eof',
});
