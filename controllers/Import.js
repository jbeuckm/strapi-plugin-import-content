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

  preAnalyzeImportFile: async ctx => {
    console.log(ctx.query);
    const data = await strapi.plugins.import.services.import.preAnalyzeImportFile(
      ctx.query.url
    );

    ctx.send(data);
  }
};
