const capitalizeTitle = (postTitle) =>
  postTitle
    .split(' ')
    .map((word) => {
      const firstLetterCapitalize = word[0].toUpperCase();
      const capitalizedWord = firstLetterCapitalize + word.slice(1);
      return capitalizedWord;
    })
    .join(' ');

module.exports = capitalizeTitle;
