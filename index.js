const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const createIcon = require('./lib/icon');
const createLogo = require('./lib/logo');
const { saveAsSVG, saveAsPNG } = require('./lib/common');


module.exports = (opts) => {
  const { buildDir, iconSizes, logoSizes } = opts;
  const svgIcons = iconSizes.map(createIcon);
  const svgLogos = logoSizes.map(createLogo);

  return Promise.all([
    saveAsSVG('icon', svgIcons, path.join(buildDir, 'icons', 'svg')),
    saveAsPNG('icon', svgIcons, path.join(buildDir, 'icons', 'png')),
    saveAsSVG('logo', svgLogos, path.join(buildDir, 'logo', 'svg')),
    saveAsPNG('logo', svgLogos, path.join(buildDir, 'logo', 'png')),
  ])
    .then(results => results.reduce(
      (memo, result) => memo.concat(result),
      [],
    ))
    .then(
      flattened => promisify(fs.writeFile)(
        path.join(buildDir, 'files.json'),
        JSON.stringify(flattened, null, 2),
      )
        .then(() => flattened),
    );
};
