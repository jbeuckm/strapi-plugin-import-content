"use strict";
const request = require("request");
const contentTypeParser = require("content-type-parser");

module.exports = {
  importItems: importConfig =>
    new Promise(async (resolve, reject) => {
      const importConfigRecord = importConfig.attributes;
      console.log("importitems", importConfigRecord);

      const url = importConfig.attributes.url;

      const { contentType, body } = await strapi.plugins[
        "import-content"
      ].services["filedataresolver"].getDataFromUrl(url);

      resolve({
        status: "import started",
        importConfigId: importConfigRecord.id
      });

      setInterval(() => {
        strapi.plugins["import-content"].models["importeditem"]
          .forge({ importconfig: importConfigRecord.id })
          .save();

        importConfigRecord.progress++;

        strapi.plugins["import-content"].models["importconfig"]
          .forge(importConfigRecord)
          .save();
      }, 1000);
    })
};
