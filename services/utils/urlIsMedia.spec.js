const urlIsMedia = require('./urlIsMedia');

describe('urlIsMedia', () => {
  it('returns true for image urls', () => {
    const URLS = [
      'http://site.com/image.gif',
      'http://other.site.com/image.gif?hello=1',
      'http://127.0.0.1/folder/image.PNG',
      'http://www.website.com/two/folders/gif.jpeg.JPEG',
      'https://site.com/thing.jpg'
    ];

    URLS.forEach(url => {
      expect(urlIsMedia(url)).toBeTruthy();
    });
  });

  it('returns false for non-image urls', () => {
    const URLS = [
      'http://site.com/gif.text',
      'https://homepage/location.gis',
      'https://localhost:333/page.html'
    ];

    URLS.forEach(url => {
      expect(urlIsMedia(url)).toBeFalsy();
    });
  });
});
