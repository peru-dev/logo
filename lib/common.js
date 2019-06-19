const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const puppeteer = require('puppeteer');


const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);


const svgToPng = async (fname, svg, width, height, type = 'png') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.addStyleTag({ content: '* { margin:0; padding:0; }' });
  // eslint-disable-next-line no-undef, no-shadow
  page.evaluate(svg => Object.assign(document.body, { innerHTML: svg }), svg);

  await page.screenshot({
    path: fname,
    type, // 'png' or 'jpeg'
    // quality: 100, // only applicable to jpeg
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width,
      height,
    },
    omitBackground: true,
    encoding: 'binary', // or 'base64'
  });

  return browser.close();
};


exports.saveAsSVG = (prefix, svgs, dir) => mkdirp(dir)
  .then(() => Promise.all(
    svgs.map(({ width, height, src }) => {
      const fname = path.join(dir, `${prefix}-${width}x${height}.svg`);
      return writeFile(fname, src)
        .then(() => stat(fname))
        .then(({ size }) => ({
          fname,
          width,
          height,
          size,
          src,
        }));
    }),
  ));


exports.saveAsPNG = (prefix, svgs, dir) => mkdirp(dir)
  .then(() => Promise.all(
    svgs.map(({ width, height, src }) => {
      const fname = path.join(dir, `${prefix}-${width}x${height}.png`);
      return svgToPng(fname, src, width, height)
        .then(() => stat(fname))
        .then(({ size }) => ({
          fname,
          width,
          height,
          size,
        }));
    }),
  ));


exports.addImports = (imports = []) => (
  (!imports || !imports.length)
    ? ''
    : `<defs>
      ${imports.reduce((prev, url) => `${prev}<style>@import url("${url}");</style>`, '')}
    </defs>`
);
