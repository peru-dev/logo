const os = require('os');
const fs = require('fs');
const path = require('path');
const { saveAsSVG, saveAsPNG } = require('../common');


describe('saveAsSVG', () => {
  it('should save svg files in the given dir', () => (
    saveAsSVG('foo', [{ src: '<svg></svg>', width: 10, height: 10 }], os.tmpdir())
      .then((results) => {
        expect(results.length).toBe(1);
        expect(results[0].fname).toBe(path.join(os.tmpdir(), 'foo-10x10.svg'));
        expect(results[0].width).toBe(10);
        expect(results[0].height).toBe(10);
        expect(results[0].size).toBe(11);
        expect(results[0].src).toBe('<svg></svg>');
        expect(fs.existsSync(results[0].fname)).toBe(true);
        expect(fs.unlinkSync(results[0].fname)).toBe(undefined);
      })
  ));
});


describe('saveAsPNG', () => {
  it('should render svgs in puppeteer and save PNG screenshots', () => (
    saveAsPNG('foo', [{ src: '<svg></svg>', width: 10, height: 10 }], os.tmpdir())
      .then((results) => {
        expect(results.length).toBe(1);
        expect(results[0].fname).toBe(path.join(os.tmpdir(), 'foo-10x10.png'));
        expect(results[0].width).toBe(10);
        expect(results[0].height).toBe(10);
        expect(typeof results[0].size).toBe('number');
        expect(fs.existsSync(results[0].fname)).toBe(true);
        expect(fs.unlinkSync(results[0].fname)).toBe(undefined);
      })
  ));
});
