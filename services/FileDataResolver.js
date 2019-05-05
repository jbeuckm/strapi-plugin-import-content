'use strict';
const request = require('request');
const validateUrl = require('./utils/validateUrl');

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

module.exports = {
  resolveFileDataFromRequest: ctx => {
    const { source, url, data } = ctx.request.body;

    console.log({ source, url, data });

    switch (source) {
      case 'upload':
      case 'url':
        return getDataFromUrl(url);
    }
  },
  getDataFromUrl
};
