'use strict';

const { getFieldNameSet, analyze } = require('./analyzer');

describe('getFieldNameSet', () => {
  it('finds set of all field names', () => {
    const fieldNames = getFieldNameSet([{ a: 1 }, { a: 1, b: 1 }, { c: 1 }]);

    expect(fieldNames).toEqual(new Set(['a', 'b', 'c']));
  });
});

describe('analyze', () => {
  it('generates an analysis from an item array', () => {
    const analysis = analyze([]);

    expect(analysis.itemCount).toEqual(0);
    expect(analysis.fieldStats).toEqual([]);
  });
});
