'use strict';

module.exports = async cb => {
  const entries = await strapi
    .query('importconfig', 'import-content')
    .find({ ongoing: true });

  const resetImportsPromises = entries.map(importConfig =>
    strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig.id }, { ongoing: false })
  );

  Promise.all(resetImportsPromises).then(cb);
};
