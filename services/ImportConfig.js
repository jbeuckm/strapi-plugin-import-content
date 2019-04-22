'use strict';
const request = require('request');
const contentTypeParser = require('content-type-parser');

const utils = require('strapi-hook-bookshelf/lib/utils/');

module.exports = {
  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated =
      populate ||
      ImportConfig.associations
        .filter(ast => ast.autoPopulate !== false)
        .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return ImportConfig.query(buildQuery({ model: ImportConfig, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  preAnalyzeImportFile: url =>
    new Promise((resolve, reject) => {
      request(url, null, async (err, res, body) => {
        if (err) {
          reject(err);
        }

        const contentType = contentTypeParser(res.headers['content-type']);

        if (contentType.isXML()) {
          const result = await strapi.plugins['import-content'].services[
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
    const entry = await ImportConfig.forge(importConfig).save();

    return entry;
  }
};
