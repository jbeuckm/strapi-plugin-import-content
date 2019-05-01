const getUrls = require('get-urls');
const urlIsMedia = require('./urlIsMedia');

const getMediaUrlsFromFieldData = fieldData => {
  switch (typeof fieldData) {
    case 'string':
      return Array.from(getUrls(fieldData)).filter(urlIsMedia);

    case 'object':
      return urlIsMedia(fieldData.url) ? [fieldData.url] : [];
  }
};

module.exports = getMediaUrlsFromFieldData;
