const esbuild = require('esbuild');

esbuild.buildSync({
  target: ['node12', 'es2020'],
  entryPoints: ['src/index.js'],
  platform: 'node',
  outfile: 'lib/out.js',
  bundle: true,
  minify: true,
  banner: { js: '/* lighthouse-runner source code */' },
  footer: { js: '/* end of lighthouse-runner source code */' },
  external: ['js-library-detector/library/libraries.js', 'lighthouse'],
  legalComments: 'none',
});
