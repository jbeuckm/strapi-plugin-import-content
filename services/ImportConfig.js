'use strict';
const fileUtils = require('./utils/fileUtils');
const analyzer = require('./utils/analyzer');
module.exports = {
  preAnalyzeImportFile: async ({ contentType, body, options }) => {
    const { sourceType, items } = await fileUtils.getItemsForFileData({
      contentType,
      body,
      options
    });

    const analysis = analyzer.analyze(sourceType, items);

    return { sourceType, ...analysis };
  }
};
