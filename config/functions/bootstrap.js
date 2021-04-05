'use strict';

const resetOngoingImports = async () => {
  const entries = await strapi
    .query('importconfig', 'import-content')
    .find({ ongoing: true });

  const resetImportsPromises = entries.map(importConfig =>
    strapi
      .query('importconfig', 'import-content')
      .update({ id: importConfig._id }, { ongoing: false })
  );

  return await Promise.all(resetImportsPromises);
};

const findAuthenticatedRole = async () => {
  const result = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: 'authenticated' });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findAuthenticatedRole();

  const permissions = await strapi
    .query('permission', 'users-permissions')
    .find({ type: 'import-content', role: role && role.id });

  await Promise.all(
    permissions.map(p =>
      strapi
        .query('permission', 'users-permissions')
        .update({ id: p.id }, { enabled: true })
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'import-content'
  });

  const initHasRun = await pluginStore.get({ key: 'initHasRun' });

  await pluginStore.set({ key: 'initHasRun', value: true });

  return !initHasRun;
};

module.exports = async callback => {
  const shouldSetDefaultPermissions = await isFirstRun();

  if (shouldSetDefaultPermissions) {
    await setDefaultPermissions();
  }

  await resetOngoingImports();

  callback && callback();
};
