'use strict';

/**
 * Import.js controller
 *
 * @description: A set of functions called "actions" of the `import` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async ctx => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  create: async ctx => {
    const importConfig = ctx.request.body;
    console.log('create', importConfig);

    const entry = await strapi.plugins['import'].models.import
      .forge(importConfig)
      .save();

    return entry;

    //    const entry = await strapi.plugins.import.services.import.add(importConfig);
    ctx.send(entry);
  },

  preAnalyzeImportFile: async ctx => {
    const data = await strapi.plugins.import.services.import.preAnalyzeImportFile(
      ctx.query.url
    );

    ctx.send(data);
  }
};
