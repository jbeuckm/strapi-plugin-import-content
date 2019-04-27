'use strict';
const fileUtils = require('./utils/fileUtils');

const queues = {};

const IMPORT_THROTTLE = 100;

const mapFields = (item, fieldMapping) => {
  const importedItem = {};

  Object.keys(fieldMapping).forEach(sourceField => {
    const targetField = fieldMapping[sourceField];

    importedItem[targetField] = item[sourceField];
  });

  return importedItem;
};

const importNextItem = async importConfig => {
  const item = queues[importConfig.id].shift();
  if (!item) {
    console.log('import complete');

    await strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig.id }, { ongoing: false });

    return;
  }

  const importedItem = mapFields(item, importConfig.fieldMapping);

  const savedContent = await strapi.models[importConfig.contentType]
    .forge(importedItem)
    .save();

  await strapi.query('importeditem', 'import-content').create({
    importconfig: importConfig.id,
    ContentId: savedContent.id,
    ContentType: importConfig.contentType
  });

  importConfig.progress++;

  await strapi
    .query('importconfig', 'import-content')
    .update({ id: importConfig.id }, { progress: importConfig.progress });

  setTimeout(() => importNextItem(importConfig), IMPORT_THROTTLE);
};

module.exports = {
  importItems: importConfig =>
    new Promise(async (resolve, reject) => {
      const importConfigRecord = importConfig.attributes;
      console.log('importitems', importConfigRecord);

      const url = importConfigRecord.url;

      try {
        const { contentType, body } = await strapi.plugins[
          'import-content'
        ].services['filedataresolver'].getDataFromUrl(url);

        const { items } = await fileUtils.getItemsForFileData({
          contentType,
          body
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
