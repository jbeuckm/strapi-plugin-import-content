const stringIsEmail = require('./stringIsEmail');

const GOOD_EMAILS = ['jim@jimspage.com', 'j45987098712@gmail.org'];
const NON_EMAILS = ['💩', 'http://businesstime.com'];

describe('stringIsEmail', () => {
  it('recognizes good emails', () => {
    GOOD_EMAILS.forEach(str => expect(stringIsEmail(str)).toBeTruthy());
  });
  it('recognizes non emails', () => {
    NON_EMAILS.forEach(str => expect(stringIsEmail(str)).toBeFalsy());
  });
});
