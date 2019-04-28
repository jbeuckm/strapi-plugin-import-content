const guessIsUrlImage = url => {
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
      return true;

    default:
      return false;
  }
};

module.exports = guessIsUrlImage;
