'use strict';
const request = require('request');
const validateUrl = require('./validateUrl');

const getDataFromUrl = url => {
  return new Promise((resolve, reject) => {
    if (!validateUrl(url)) return reject('invalid URL');

    request(url, null, async (err, res, body) => {
      if (err) {
        reject(err);
      }

      resolve({ contentType: res.headers['content-type'], body });
    });
  });
};

const resolveFileDataFromRequest = async ctx => {
  const { source, type, options, data } = ctx.request.body;

  switch (source) {
    case 'upload':
      return { contentType: type, body: data, options };

    case 'url':
      const { contentType, body } = await getDataFromUrl(options.url);
      return { contentType, body, options };

    case 'raw':
      return {
        contentType: type,
        body: options.rawText,
        options
      };
  }
};

module.exports = {
  resolveFileDataFromRequest,
  getDataFromUrl
};
