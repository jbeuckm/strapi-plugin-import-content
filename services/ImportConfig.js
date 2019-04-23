"use strict";
const contentTypeParser = require("content-type-parser");
const RssParser = require("rss-parser");

module.exports = {
  preAnalyzeImportFile: ({ contentType, body }) =>
    new Promise(async (resolve, reject) => {
      const parsedContentType = contentTypeParser(contentType);

      if (parsedContentType.isXML()) {
        const parser = new RssParser();
        const feed = await parser.parseString(body);

        const result = await strapi.plugins["import-content"].services[
          "analyzeitems"
        ].analyze(feed.items);

        resolve({ sourceType: "rss", ...result });
      } else {
        reject({
          contentType: parsedContentType.toString()
        });
      }
    })
};
