const getUrls = require('get-urls');
const guessIsUrlImage = require('./guessIsUrlImage');
const striptags = require('striptags');
const request = require('request');
const getUploadProvider = require('./getUploadProvider');
const fileFromBuffer = require('./fileFromBuffer');

const importMediaFile = url =>
  new Promise((resolve, reject) => {
    request({ url, method: 'GET', encoding: null }, async (err, res, body) => {
      if (err) {
        reject(err);
      }

      const mimeType = res.headers['content-type'].split(';').shift();

      const parsed = new URL(url);
      const extension = parsed.pathname
        .split('.')
        .pop()
        .toLowerCase();

      const { provider, actions } = await getUploadProvider();

      const file = fileFromBuffer(mimeType, extension, body);

      await actions.upload(file);

      delete file.buffer;

      file.provider = provider.provider;

      resolve(file);
    });
  });

const importFields = async (sourceItem, fieldMapping) => {
  const importedItem = {};

  Object.keys(fieldMapping).forEach(async sourceField => {
    const { targetField, stripTags, importMedia } = fieldMapping[sourceField];

    const originalValue = sourceItem[sourceField];

    importedItem[targetField] = stripTags
      ? striptags(originalValue)
      : originalValue;

    if (importMedia) {
      const urls = Array.from(getUrls(originalValue)).filter(guessIsUrlImage);

      const promises = urls.map(importMediaFile);

      await Promise.all(promises);
    }
  });

  return importedItem;
};

module.exports = importFields;
