const _ = require('lodash');
const path = require('path');

module.exports = async () => {
  const uploadProviderConfig = await strapi
    .store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'upload'
    })
    .get({ key: 'provider' });

  // Get upload provider settings to configure the provider to use.
  const provider = _.find(strapi.plugins.upload.config.providers, {
    provider: uploadProviderConfig.provider
  });

  if (!provider) {
    throw new Error(
      `The provider package isn't installed. Please run \`npm install strapi-provider-upload-${
        uploadProviderConfig.provider
      }\``
    );
  }

  const getPath = file =>
    uploadProviderConfig.provider === 'local'
      ? path.join(strapi.config.appPath, strapi.config.public.path, file.url)
      : file.url;

  return {
    config: uploadProviderConfig,
    provider,
    actions: await provider.init(uploadProviderConfig),
    getPath
  };
};
