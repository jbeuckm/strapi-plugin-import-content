'use strict';
const request = require('request');
const contentTypeParser = require('content-type-parser');

const utils = require('strapi-hook-bookshelf/lib/utils/');

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
    }),

  add: async importConfig => {
    const entry = await Import.forge(importConfig).save();

    return entry;
  }
};
