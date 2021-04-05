'use strict';
const _ = require('lodash');

const queues = {};

const removeImportedFiles = async (fileIds, uploadConfig) => {
  const removePromises = fileIds.map(id =>
    strapi.plugins['upload'].services.upload.remove({ id }, uploadConfig)
  );

  return await Promise.all(removePromises);
};

const undoNextItem = async (importConfig, uploadConfig) => {
  const item = queues[importConfig._id].shift();

  if (!item) {
    console.log('undo complete');

    await strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig._id }, { ongoing: false });

    return;
  }

  await strapi.models[importConfig.contentType]
    .forge({ id: item.ContentId })
    .destroy();

  const importedFileIds = _.compact(item.importedFiles.fileIds);

  await removeImportedFiles(importedFileIds, uploadConfig);

  await strapi.query('importeditem', 'import-content').delete({
    id: item._id
  });

  const { UNDO_THROTTLE } = strapi.plugins['import-content'].config;
  setTimeout(() => undoNextItem(importConfig, uploadConfig), UNDO_THROTTLE);
};

module.exports = {
  undoItems: importConfig =>
    new Promise(async (resolve, reject) => {
      try {
        queues[importConfig._id] = importConfig.importeditems;
      } catch (error) {
        reject(error);
      }

      await strapi
        .query('importconfig', 'import-content')
        .update({ id: importConfig._id }, { ongoing: true });

      resolve({
        status: 'undo started',
        importConfigId: importConfig._id
      });

      const uploadConfig = await strapi
        .store({
          environment: strapi.config.environment,
          type: 'plugin',
          name: 'upload'
        })
        .get({ key: 'provider' });

      undoNextItem(importConfig, uploadConfig);
    })
};
