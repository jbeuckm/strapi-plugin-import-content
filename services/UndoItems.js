'use strict';
const fileUtils = require('./utils/fileUtils');

const queues = {};

const UNDO_THROTTLE = 100;

const undoNextItem = async importConfig => {
  const item = queues[importConfig.id].shift();
  console.log('undoing item ', { item });
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

  await strapi.query('importeditem', 'import-content').delete({
    id: item.id
  });

  setTimeout(() => undoNextItem(importConfig), UNDO_THROTTLE);
};

module.exports = {
  undoItems: importConfig =>
    new Promise(async (resolve, reject) => {
      console.log('undoitems', importConfig);

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
