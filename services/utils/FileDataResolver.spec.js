const nock = require('nock');
const {
  resolveFileDataFromRequest,
  getDataFromUrl
} = require('./FileDataResolver');

const TEST_BASE_URL = 'http://test';
const TEST_PATH = '/';

describe('resolveFileDataFromRequest', () => {
  it('requests data for "url" source', async () => {
    nock(TEST_BASE_URL)
      .get(TEST_PATH)
      .reply(200, 'data', { 'Content-Type': 'text/csv' });

    const ctx = {
      request: {
        body: { source: 'url', options: { url: TEST_BASE_URL + TEST_PATH } }
      }
    };

    const response = await resolveFileDataFromRequest(ctx);

    console.log(response);
    expect(response).toHaveProperty('contentType');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('options');
  });

  it('parses data for "raw" source', async () => {
    const ctx = {
      request: {
        body: {
          source: 'raw',
          type: 'text/csv',
          options: {},
          data: 'key1,key2\nvalue1,value2'
        }
      }
    };

    const response = await resolveFileDataFromRequest(ctx);

    console.log(response);
    expect(response).toHaveProperty('contentType');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('options');
  });

  it('parses data for "upload" source', async () => {
    const ctx = {
      request: { body: { source: 'upload', data: 'abc123' } }
    };

    const response = await resolveFileDataFromRequest(ctx);
    console.log(response);
    expect(response).toHaveProperty('contentType');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('options');
  });
});

describe('getDataFromUrl', () => {
  it('fetches type and data from a url', async () => {
    nock(TEST_BASE_URL)
      .get(TEST_PATH)
      .reply(200, 'data', { 'Content-Type': 'text/csv' });

    const response = await getDataFromUrl(TEST_BASE_URL + TEST_PATH);

    expect(response).toHaveProperty('contentType');
    expect(response).toHaveProperty('body');
  });
});
