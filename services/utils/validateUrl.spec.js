const validateUrl = require('./validateUrl');

const GOOD_URLS = [
  'http://cernalerts.web.cern.ch/cernalerts/?feed=cern%20hot%20news',
  'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'
];

const BAD_URLS = ['hello my name is', '1234'];

describe('validateUrl', () => {
  it('returns true for valid urls', () => {
    GOOD_URLS.forEach(url => expect(validateUrl(url)).toBeTruthy());
  });
  it('returns false for not urls', () => {
    BAD_URLS.forEach(url => expect(validateUrl(url)).toBeFalsy());
  });
});
