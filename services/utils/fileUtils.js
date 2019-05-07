const contentTypeParser = require('content-type-parser');
const RssParser = require('rss-parser');
const parse = require('csv-parse/lib/sync');

const getItemsForFileData = ({ contentType, body, options }) =>
  new Promise(async (resolve, reject) => {
    const parsedContentType = contentTypeParser(contentType);

    if (parsedContentType.isXML()) {
      const parser = new RssParser();
      const feed = await parser.parseString(body);

      return resolve({ sourceType: 'rss', items: feed.items });
    }

    if (contentType === 'text/csv') {
      const items = parse(body, {
        ...options,
        columns: true
      });
      return resolve({ sourceType: 'csv', items });
    }

    reject({
      contentType: parsedContentType.toString()
    });
  });

module.exports = { getItemsForFileData };
