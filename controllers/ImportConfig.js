"use strict";

module.exports = {
  index: async ctx => {
    const entries = await strapi.plugins["import-content"].models[
      "importconfig"
    ]
      .fetchAll()
      .then(data => data.toJSON());

    ctx.send(entries);
  },

  create: async ctx => {
    const importConfig = ctx.request.body;
    console.log("create", importConfig);

    importConfig.progress = 0;
    importConfig.ongoing = true;

    const entry = await strapi.plugins["import-content"].models["importconfig"]
      .forge(importConfig)
      .save();

    ctx.send(entry);

    strapi.plugins["import-content"].services["importitems"].importItems(entry);
  },

  undo: async ctx => {
    const importId = ctx.params.importId;

    const importConfig = await strapi.plugins["import-content"].models[
      "importconfig"
    ].forge({
      id: importId
    });

    console.log("undo", importConfig);

    ctx.send(importConfig.attributes);
  },

  delete: async ctx => {
    const importId = ctx.params.importId;

    await strapi.plugins["import-content"].models["importconfig"]
      .forge({
        id: importId
      })
      .destroy();

    ctx.send({ message: "ok" });
  },

  preAnalyzeImportFile: async ctx => {
    const services = strapi.plugins["import-content"].services;

    const { contentType, body } = await services[
      "filedataresolver"
    ].resolveFileDataFromRequest(ctx);

    try {
      const data = await services["importconfig"].preAnalyzeImportFile({
        contentType,
        body
      });

      ctx.send(data);
    } catch (error) {
      ctx.response.notAcceptable("could not parse", error);
    }
  }
};
