'use strict';
const _ = require('lodash');
const fileUtils = require('./utils/fileUtils');
const importFields = require('./utils/importFields');
const importMediaFiles = require('./utils/importMediaFiles');

const queues = {};

const importNextItem = async importConfig => {
  const sourceItem = queues[importConfig.id].shift();
  if (!sourceItem) {
    console.log('import complete');

    await strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig.id }, { ongoing: false });

    return;
  }

  const importedItem = await importFields(
    sourceItem,
    importConfig.fieldMapping
  );

  const savedContent = await strapi.models[importConfig.contentType]
    .forge(importedItem)
    .save();

  const uploadedFiles = await importMediaFiles(
    savedContent,
    sourceItem,
    importConfig
  );
  const fileIds = _.map(_.flatten(uploadedFiles), 'id');

  await strapi.query('importeditem', 'import-content').create({
    importconfig: importConfig.id,
    ContentId: savedContent.id,
    ContentType: importConfig.contentType,
    importedFiles: { fileIds }
  });

  const { IMPORT_THROTTLE } = strapi.plugins['import-content'].config;
  setTimeout(() => importNextItem(importConfig), IMPORT_THROTTLE);
};

module.exports = {
  importItems: (importConfig, { contentType, body }) =>
    new Promise(async (resolve, reject) => {
      const importConfigRecord = importConfig.attributes;
      console.log('importitems', importConfigRecord);

      try {
        const { items } = await fileUtils.getItemsForFileData({
          contentType,
          body,
          options: importConfigRecord.options
        });

        queues[importConfigRecord.id] = items;
      } catch (error) {
        reject(error);
      }

      resolve({
        status: 'import started',
        importConfigId: importConfigRecord.id
      });

      importNextItem(importConfigRecord);
    })
};
