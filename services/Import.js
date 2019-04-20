'use strict';
const request = require('request');

/**
 * Import.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  preAnalyzeImportFile: url => {
    request(url, null, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
    });
  }
};
