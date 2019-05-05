const _ = require('lodash');
const request = require('request');
const getUploadProvider = require('./getUploadProvider');
const fileFromBuffer = require('./fileFromBuffer');
const getMediaUrlsFromFieldData = require('./getMediaUrlsFromFieldData');

const fetchAndStoreFiles = url =>
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

const relateFileToContent = async ({
  contentType,
  contentId,
  targetField,
  fileDescriptor
}) => {
  fileDescriptor.related = [
    {
      refId: contentId,
      ref: contentType,
      source: 'content-manager',
      field: targetField
    }
  ];

  return await strapi.plugins['upload'].services.upload.add(fileDescriptor);
};

const importMediaFiles = async (savedContent, sourceItem, importConfig) => {
  const { fieldMapping, contentType } = importConfig;

  const uploadedFileDescriptors = _.mapValues(
    fieldMapping,
    async (mapping, sourceField) => {
      if (mapping.importMediaToField) {
        const urls = getMediaUrlsFromFieldData(sourceItem[sourceField]);

        const uploadPromises = _.uniq(urls).map(fetchAndStoreFiles);

        const fileDescriptors = await Promise.all(uploadPromises);

        const relateContentPromises = fileDescriptors.map(fileDescriptor =>
          relateFileToContent({
            contentType,
            contentId: savedContent.id,
            targetField: mapping.importMediaToField,
            fileDescriptor
          })
        );

        return await Promise.all(relateContentPromises);
      }
    }
  );

  return await Promise.all(_.values(uploadedFileDescriptors));
};

module.exports = importMediaFiles;
