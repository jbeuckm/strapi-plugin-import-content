const getMediaUrlsFromFieldData = require('./getMediaUrlsFromFieldData');

const TEST_URL = 'http://site.com/image.png';

describe('getMediaUrlsFromFieldData', () => {
  it('finds urls in string', () => {
    expect(getMediaUrlsFromFieldData(TEST_URL)).toEqual([TEST_URL]);
    expect(getMediaUrlsFromFieldData('💩')).toEqual([]);
  });

  it('finds urls in object', () => {
    const TEST_OBJECT = { url: TEST_URL };
    expect(getMediaUrlsFromFieldData(TEST_OBJECT)).toEqual([TEST_URL]);
    expect(getMediaUrlsFromFieldData({})).toEqual([]);
  });
});
