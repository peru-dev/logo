#! /usr/bin/env node


const path = require('path');
const minimist = require('minimist');
const prettyBytes = require('pretty-bytes');
const peruDevLogo = require('../');
const pkg = require('../package.json');


const bin = Object.keys(pkg.bin)[0];


const help = () => `Usage: ${bin} [outdir]

Arguments

  * outdir: Directory where images will be saved. Default is cwd.

Options

  -i, --icon     Comma separated list of icon sizes to generate.
  -l, --logo     Comma separated list of logo sizes to generate.
  -h, --help     Show this help.
  -v, --version  Show ${bin} version.
`;


const parseSizes = val => (
  (typeof val === 'string')
    ? val.split(',').map(str => parseInt(str, 10))
    : (typeof val === 'number')
      ? [val]
      : Array.isArray(val)
        ? val
        : []
);


if (require.main === module) {
  const { _: args, ...opts } = minimist(process.argv.slice(2));

  if (opts.h || opts.help) {
    console.log(help());
    process.exit(0);
  }

  if (opts.v || opts.version) {
    console.log(pkg.version);
    process.exit(0);
  }

  peruDevLogo({
    buildDir: path.join(process.cwd(), 'build'),
    iconSizes: parseSizes(opts.icon || opts.i || [256, 512, 1024]),
    logoSizes: parseSizes(opts.logo || opts.l || [256, 512, 1024]),
  })
    .then(results => console.log(
      results
        .map(({ fname, size }) => `${fname} ${prettyBytes(size)}`)
        .join('\n'),
    ))
    .catch(console.error);
}
