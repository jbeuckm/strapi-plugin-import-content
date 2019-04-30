const importFields = require('./importFields');

describe('importField', () => {
  it('copies field data into result', async () => {
    const result = await importFields(
      { a: 'hello' },
      { a: { targetField: 'b' } }
    );
    expect(result['b']).toEqual('hello');
  });
});
