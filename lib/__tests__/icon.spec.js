const createIcon = require('../icon');


describe('createIcon', () => {
  it('should be a function', () => {
    expect(typeof createIcon).toBe('function');
  });

  it('should return an object with src, width and height props', () => {
    const result = createIcon();
    expect(typeof result).toBe('object');
    expect(typeof result.src).toBe('string');
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
  });

  it('should create icon with default width (512px)', () => {
    const result = createIcon();
    const matches = /^<svg width="(\d+)" height="(\d+)"/.exec(result.src.split('\n')[0]);
    expect(matches.length).toBe(3);
    expect(matches[1]).toBe('512');
    expect(matches[2]).toBe('512');
    expect(result.width).toBe(512);
    expect(result.height).toBe(512);
  });
});
