const urlIsMedia = url => {
  const parsed = new URL(url);

  const extension = parsed.pathname
    .split('.')
    .pop()
    .toLowerCase();

  switch (extension) {
    case 'png':
    case 'gif':
    case 'jpg':
    case 'jpeg':
    case 'svg':
    case 'bmp':
    case 'tif':
    case 'tiff':
      return true;

    case 'mp3':
    case 'wav':
    case 'ogg':
      return true;

    case 'mp4':
    case 'avi':
      return true;

    default:
      return false;
  }
};

module.exports = urlIsMedia;
