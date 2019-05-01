const request = require('request');
const getUploadProvider = require('./getUploadProvider');
const fileFromBuffer = require('./fileFromBuffer');
const getMediaUrlsFromFieldData = require('./getMediaUrlsFromFieldData');

const importMediaFile = url =>
  new Promise((resolve, reject) => {
    request({ url, method: 'GET', encoding: null }, async (err, res, body) => {
      if (err) {
        reject(err);
      }

      const mimeType = res.headers['content-type'].split(';').shift();

      const parsed = new URL(url);
      const extension = parsed.pathname
        .split('.')
        .pop()
        .toLowerCase();

      const { provider, actions } = await getUploadProvider();

      const fileDescriptor = fileFromBuffer(mimeType, extension, body);

      await actions.upload(fileDescriptor);

      delete fileDescriptor.buffer;

      fileDescriptor.provider = provider.provider;

      resolve(fileDescriptor);
    });
  });

const importMediaFiles = async (savedContent, sourceItem, importConfig) => {
  const { fieldMapping, contentType } = importConfig;

  Object.keys(fieldMapping).forEach(async sourceField => {
    const { importMediaToField } = fieldMapping[sourceField];

    if (importMediaToField) {
      const urls = getMediaUrlsFromFieldData(sourceItem[sourceField]);

      const promises = urls.map(importMediaFile);

      const fileDescriptors = await Promise.all(promises);

      return fileDescriptors.map(async fd => {
        fd.related = [
          {
            refId: savedContent.id,
            ref: contentType,
            source: 'content-manager',
            field: importMediaToField
          }
        ];

        return await strapi.plugins['upload'].services.upload.add(fd);
      });
    }
  });
};

module.exports = importMediaFiles;
