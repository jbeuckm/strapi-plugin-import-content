const { removeNones } = require('./utils');

describe('removeNones', () => {
  it('removes mappings to the "none" targetField', () => {
    const mappings = {
      good: {
        targetField: 'fieldOne'
      },
      bad: {
        targetField: 'none'
      }
    };

    const result = removeNones(mappings);

    expect(result.good).toEqual({
      targetField: 'fieldOne'
    });
    expect(result.bad).toBe(undefined);
  });
});
