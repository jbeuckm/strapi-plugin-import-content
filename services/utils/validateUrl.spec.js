const validateUrl = require('./validateUrl');

const GOOD_URLS = [
  'http://cernalerts.web.cern.ch/cernalerts/?feed=cern%20hot%20news',
  'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'
];

describe('validateUrl', () => {
  it('returns true for valide urls', () => {
    GOOD_URLS.forEach(url => expect(validateUrl(url)).toEqual(true));
  });
});
