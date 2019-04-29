const importFields = require('./importFields');

describe('importField', () => {
  it('copies field data into result', () => {
    const result = importFields({ a: 'hello' }, { a: { targetField: 'b' } });
    expect(result['b']).toEqual('hello');
  });
});
