const isArticleValid = (title: string, body: string): boolean => {
  if (title.length < 5 || body.length == 0) {
    return false;
  }

  return true;
};

export { isArticleValid };
