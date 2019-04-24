"use strict";
const request = require("request");
const contentTypeParser = require("content-type-parser");
const fileUtils = require("./utils/fileUtils");

const queues = {};

const IMPORT_THROTTLE = 1000;

const importNextItem = importConfig => {
  const item = queues[importConfig.id].shift();
  if (!item) {
    console.log("import complete", importConfig);
    importConfig.ongoing = false;

    strapi.plugins["import-content"].models["importconfig"]
      .forge(importConfig)
      .save();
    return;
  }

  console.log("will import", item);

  //TODO: map fields and create target model

  strapi.plugins["import-content"].models["importeditem"]
    .forge({ importconfig: importConfig.id })
    .save();

  importConfig.progress++;

  strapi.plugins["import-content"].models["importconfig"]
    .forge(importConfig)
    .save();

  setTimeout(() => importNextItem(importConfig), IMPORT_THROTTLE);
};

module.exports = {
  importItems: importConfig =>
    new Promise(async (resolve, reject) => {
      const importConfigRecord = importConfig.attributes;
      console.log("importitems", importConfigRecord);

      const url = importConfigRecord.url;

      const { contentType, body } = await strapi.plugins[
        "import-content"
      ].services["filedataresolver"].getDataFromUrl(url);

      const { items } = await fileUtils.getItemsForFileData({
        contentType,
        body
      });
      console.log({ items });
      queues[importConfigRecord.id] = items;
      console.log({ queueItems: queues[importConfigRecord.id] });

      resolve({
        status: "import started",
        importConfigId: importConfigRecord.id
      });

      importNextItem(importConfigRecord);
    })
};
