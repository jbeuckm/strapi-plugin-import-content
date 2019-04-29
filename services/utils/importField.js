const striptags = require('striptags');

const importField = (item, fieldMapping) => {
  const importedItem = {};

  Object.keys(fieldMapping).forEach(sourceField => {
    const { targetField, stripTags } = fieldMapping[sourceField];

    const originalValue = item[sourceField];

    importedItem[targetField] = stripTags
      ? striptags(originalValue)
      : originalValue;
  });

  return importedItem;
};

module.exports = importField;
