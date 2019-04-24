const contentTypeParser = require("content-type-parser");
const RssParser = require("rss-parser");

const getItemsForFileData = ({ contentType, body }) =>
  new Promise(async (resolve, reject) => {
    const parsedContentType = contentTypeParser(contentType);

    if (parsedContentType.isXML()) {
      const parser = new RssParser();
      const feed = await parser.parseString(body);

      resolve({ sourceType: "rss", items: feed.items });
    } else {
      reject({
        contentType: parsedContentType.toString()
      });
    }
  });

module.exports = { getItemsForFileData };
