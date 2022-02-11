const esbuild = require('esbuild');

esbuild.buildSync({
  target: ['node12', 'es2020'],
  entryPoints: ['src/index.js', 'src/child.js'],
  platform: 'node',
  outdir: 'dist',
  bundle: true,
  minify: true,
  external: ['js-library-detector/library/libraries.js', 'lighthouse'],
  legalComments: 'none',
});
