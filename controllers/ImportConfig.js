'use strict';
const {
  resolveFileDataFromRequest
} = require('../services/utils/FileDataResolver');

module.exports = {
  index: async ctx => {
    const entries = await strapi.query('importconfig', 'import-content').find();

    const withCounts = entries.map(entry => ({
      ...entry,
      importedCount: entry.importeditems.length,
      importeditems: undefined
    }));

    ctx.send(withCounts);
  },

  create: async ctx => {
    const services = strapi.plugins['import-content'].services;
    const importConfig = ctx.request.body;
    console.log('create', importConfig);
    importConfig.ongoing = true;

    const record = await strapi
      .query('importconfig', 'import-content')
      .create(importConfig);

    ctx.send(record);

    const { contentType, body } = await resolveFileDataFromRequest(ctx);

    services['importitems'].importItems(record, { contentType, body });
  },

  undo: async ctx => {
    const importId = ctx.params.importId;

    const importConfig = await strapi
      .query('importconfig', 'import-content')
      .findOne({ id: importId });

    console.log('undo', importId);

    ctx.send(importConfig);

    strapi.plugins['import-content'].services['undoitems'].undoItems(
      importConfig
    );
  },

  delete: async ctx => {
    const importId = ctx.params.importId;

    await strapi.query('importconfig', 'import-content').delete({
      id: importId
    });

    ctx.send({ message: 'ok' });
  },

  preAnalyzeImportFile: async ctx => {
    const services = strapi.plugins['import-content'].services;

    const { contentType, body, options } = await resolveFileDataFromRequest(
      ctx
    );

    try {
      const data = await services['importconfig'].preAnalyzeImportFile({
        contentType,
        body,
        options
      });

      ctx.send(data);
    } catch (error) {
      ctx.response.notAcceptable('could not parse', error);
    }
  }
};
