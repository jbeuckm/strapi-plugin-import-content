'use strict';
const request = require('request');
const contentTypeParser = require('content-type-parser');

/**
 * Import.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  preAnalyzeImportFile: url =>
    new Promise((resolve, reject) => {
      request(url, null, (err, res, body) => {
        if (err) {
          reject(err);
        }
        console.log(Object.keys(res));

        const contentType = contentTypeParser(res.headers['content-type']);
        console.log(contentType.type, contentType.subtype);

        resolve({
          contentType
        });
      });
    })
};
