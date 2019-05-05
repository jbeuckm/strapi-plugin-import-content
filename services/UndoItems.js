'use strict';
const fileUtils = require('./utils/fileUtils');

const queues = {};

const UNDO_THROTTLE = 100;

const removeImportedFiles = async fileIds => {
  const config = await strapi
    .store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'upload'
    })
    .get({ key: 'provider' });

  const removePromises = fileIds.map(id =>
    strapi.plugins['upload'].services.upload.remove({ id }, config)
  );

  return await Promise.all(removePromises);
};

const undoNextItem = async importConfig => {
  const item = queues[importConfig.id].shift();

  if (!item) {
    console.log('undo complete');

    await strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig.id }, { ongoing: false });

    return;
  }

  await strapi.models[importConfig.contentType]
    .forge({ id: item.ContentId })
    .destroy();

  const importedFileIds = item.importedFiles.fileIds;
  await removeImportedFiles(importedFileIds);

  await strapi.query('importeditem', 'import-content').delete({
    id: item.id
  });

  setTimeout(() => undoNextItem(importConfig), UNDO_THROTTLE);
};

module.exports = {
  undoItems: importConfig =>
    new Promise(async (resolve, reject) => {
      try {
        queues[importConfig.id] = importConfig.importeditems;
      } catch (error) {
        reject(error);
      }

      await strapi
        .query('importconfig', 'import-content')
        .update({ id: importConfig.id }, { ongoing: true });

      resolve({
        status: 'undo started',
        importConfigId: importConfig.id
      });

      undoNextItem(importConfig);
    })
};
