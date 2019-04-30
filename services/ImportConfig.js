'use strict';
const fileUtils = require('./utils/fileUtils');
const analyzer = require('./utils/analyzer');
module.exports = {
  preAnalyzeImportFile: async ({ contentType, body }) => {
    const { sourceType, items } = await fileUtils.getItemsForFileData({
      contentType,
      body
    });

    const analysis = analyzer.analyze(sourceType, items);

    return { sourceType, ...analysis };
  }
};
