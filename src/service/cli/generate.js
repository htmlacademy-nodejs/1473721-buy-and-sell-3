'use strict';

const {getRandomInt, shuffle, writeFileJson, getDataFromFile} = require(`../../utils`);
const chalk = require(`chalk`);

const DEFAULT_COUNT_OFFERS = 1;
const NUMBER_FOR_RADIX = 10;
const MAX_COUNT_OFFERS = 1000;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16
};

const generateType = () => OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]];
const generateDescription = (sentences) => shuffle(sentences).slice(1, 5).join(` `);
const generateSum = () => getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
const generatePictureFileName = () => {
  const numberPicture = getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX);
  return `item${numberPicture < NUMBER_FOR_RADIX ? `0${numberPicture}` : numberPicture}.jpg`;
};
const generateText = (texts) => texts[getRandomInt(0, texts.length - 1)];

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    type: generateType(),
    title: generateText(titles),
    description: generateDescription(sentences),
    sum: generateSum(),
    picture: generatePictureFileName(),
    category: generateText(categories),
  }));
};


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_OFFERS;
    if (countOffer < MAX_COUNT_OFFERS) {
      const titlesPromise = getDataFromFile(FILE_TITLES_PATH);
      const categoriesPromise = getDataFromFile(FILE_CATEGORIES_PATH);
      const sentencesPromise = getDataFromFile(FILE_SENTENCES_PATH);
      const [titles, categories, sentences] = await Promise.all([titlesPromise, categoriesPromise, sentencesPromise]);
      await writeFileJson(FILE_NAME, generateOffers(countOffer, titles, categories, sentences));
    } else {
      console.info(chalk.red(`Не больше 1000 объявлений`));
    }
  }
};
