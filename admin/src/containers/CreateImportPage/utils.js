const _ = require('lodash');

module.exports = {
  removeNones: mappings =>
    _.omitBy(mappings, mapping => mapping.targetField === 'none')
};
