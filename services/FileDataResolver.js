'use strict';
const request = require('request');
const validateUrl = require('./utils/validateUrl');

/*
 * Get the file data from the URL in the query.
 * This could eventually get data from an uploaded file or other source.
 */
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
    const url = ctx.query.url;

    return getDataFromUrl(url);
  },
  getDataFromUrl
};
