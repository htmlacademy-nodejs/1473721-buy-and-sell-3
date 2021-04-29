'use strict';

const {getRandomInt, shuffle, writeFileJson} = require(`../../utils`);
const chalk = require(`chalk`);

const DEFAULT_NUMBERS = {
  DEFAULT_COUNT: 1,
  TEN: 10,
  MAX_COUNT_OFFERS: 1000
};

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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
const generateDescription = () => shuffle(SENTENCES).slice(1, 5).join(` `);
const generateSum = () => getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
const generatePictureFileName = () => {
  const numberPicture = getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX);
  return `item${numberPicture < DEFAULT_NUMBERS.TEN ? `0${numberPicture}` : numberPicture}.jpg`;
};
const generateText = (texts) => texts[getRandomInt(0, texts.length - 1)];

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    type: generateType(),
    title: generateText(TITLES),
    description: generateDescription(),
    sum: generateSum(),
    picture: generatePictureFileName(),
    category: generateText(CATEGORIES),
  }));
};


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_NUMBERS.DEFAULT_COUNT;
    if (countOffer < DEFAULT_NUMBERS.MAX_COUNT_OFFERS) {
      await writeFileJson(FILE_NAME, generateOffers(countOffer));
    } else {
      console.info(chalk.red(`Не больше 1000 объявлений`));
    }
  }
};
