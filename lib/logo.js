const style = require('./style');
const { addImports } = require('./common');


module.exports = (width = 512) => {
  const height = Math.round(width / 2);
  return {
    width,
    height,
    src: `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${addImports(style.imports)}
      <style>
        text {
          font-family: ${style.fontFamily};
          font-size: ${Math.round(width / 10)}px;
          fill: ${style.primaryColor};
          font-weight: 500;
        }
      </style>
      <rect x="0" y="0" width="100%" height="100%" style="fill: ${style.backgroundColor};"></rect>
      <text dominant-baseline="middle" text-anchor="middle" x="50%" y="50%">
        <tspan>&lt;PE</tspan><tspan style="fill: ${style.secondaryColor}">RÚ D</tspan><tspan>EV&gt;</tspan>
      </text>
    </svg>`,
  };
};
