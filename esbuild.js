require('esbuild').buildSync({
  target: ['node12'],
  entryPoints: ['src/index.js'],
  platform: 'node',
  outfile: 'dist/out.js',
  bundle: true,
  minify: true,
  external: ['js-library-detector/library/libraries.js', 'lighthouse'],
});
