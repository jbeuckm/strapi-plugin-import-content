'use strict';
const request = require('request');
const contentTypeParser = require('content-type-parser');
const Joi = require('joi');

module.exports = {
  importItems: importConfig =>
    new Promise((resolve, reject) => {
      console.log('importitems', importConfig);
      const schema = Joi.string().uri();

      const url = importConfig.attributes.url;

      const { error } = Joi.validate(url, schema);
      error && reject(error);

      request(url, null, async (err, res, body) => {
        if (err) {
          reject(err);
        }

        const contentType = contentTypeParser(res.headers['content-type']);

        if (contentType.isXML()) {
          const result = await strapi.plugins['import-content'].services[
            'analyzexml'
          ].analyze(body);

          resolve({ sourceType: 'rss', ...result });

          setInterval(() => {
            const record = importConfig.attributes;
            record.progress++;
            strapi.plugins['import-content'].models['importconfig']
              .forge(record)
              .save();
          }, 1000);
        } else {
          reject({
            contentType: contentType.toString()
          });
        }
      });
    })
};
