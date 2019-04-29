'use strict';

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
    const importConfig = ctx.request.body;
    console.log('create', importConfig.fieldMapping);
    importConfig.ongoing = true;

    const entry = await strapi
      .query('importconfig', 'import-content')
      .create(importConfig);

    ctx.send(entry);

    strapi.plugins['import-content'].services['importitems'].importItems(entry);
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

    const { contentType, body } = await services[
      'filedataresolver'
    ].resolveFileDataFromRequest(ctx);

    try {
      const data = await services['importconfig'].preAnalyzeImportFile({
        contentType,
        body
      });

      ctx.send(data);
    } catch (error) {
      ctx.response.notAcceptable('could not parse', error);
    }
  }
};
