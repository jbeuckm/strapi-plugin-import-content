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
      request(url, null, async (err, res, body) => {
        if (err) {
          reject(err);
        }

        const contentType = contentTypeParser(res.headers['content-type']);

        if (contentType.isXML()) {
          const result = await strapi.plugins['import'].services[
            'analyzexml'
          ].analyze(body);

          resolve({ status: 'success', sourceType: 'rss', ...result });
        } else {
          resolve({
            status: 'unknown type',
            contentType: contentType.toString()
          });
        }
      });
    })
};
