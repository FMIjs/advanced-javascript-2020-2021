const { build } = require('esbuild')

const options = {
  entryPoints: ['./src/front/index.js'],
  minify: process.env.NODE_ENV === 'production',
  bundle: true,
  sourcemap: true,
  outfile: './public/scripts/index.js',
}

build(options).catch(err => {
  process.stderr.write(err.stderr)
  process.exit(1)
})