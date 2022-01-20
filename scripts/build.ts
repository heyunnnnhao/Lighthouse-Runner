import path from 'path';
import { build } from 'esbuild';

const baseConfig = {
  platform: 'node' as const,
  target: 'node12' as const,
  bundle: true,
  minify: true,
  nodePaths: [path.join(__dirname, '../src')],
  sourcemap: true,
  external: ['lighthouse'],
};

async function main() {
  await build({
    ...baseConfig,
    format: 'cjs',
    outdir: path.join(__dirname, '../build/cjs'),
    entryPoints: [path.join(__dirname, '../src/index.ts')],
  });

  await build({
    ...baseConfig,
    format: 'esm',
    outdir: path.join(__dirname, '../build/esm'),
    entryPoints: [path.join(__dirname, '../src/index.ts')],
  });
}

if (require.main === module) {
  main();
}
