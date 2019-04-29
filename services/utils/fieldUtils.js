const getUrls = require('get-urls');
const guessIsUrlImage = require('./guessIsUrlImage');
const striptags = require('striptags');

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const detectStringFieldFormat = data => {
  if (new Date(data).toString() !== 'Invalid Date') return 'date';

  if (EMAIL_REGEXP.test(data)) return 'email';

  if (data.length !== striptags(data).length) {
    return 'xml';
  }

  return 'string';
};

const detectFieldFormat = data => {
  switch (typeof data) {
    case 'number':
      return 'number';

    case 'boolean':
      return 'boolean';

    case 'string':
      return detectStringFieldFormat(data);
  }
};

const compileStatsForFieldData = fieldData => {
  const stats = {};

  try {
    const urls = Array.from(getUrls(fieldData));

    const l = urls.length;
    for (let i = 0; i < l; ++i) {
      if (guessIsUrlImage(urls[i])) {
        stats.hasImageUrls = true;
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }

  stats.length = fieldData.length;
  stats.format = detectFieldFormat(fieldData);

  return stats;
};

module.exports = {
  detectStringFieldFormat,
  detectFieldFormat,
  compileStatsForFieldData
};
