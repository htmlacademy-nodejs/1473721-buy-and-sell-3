'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {} = require(`jest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const HttpCode = require(`../../httpCode`);

const mockData = [{
  "id": `6qwbWN`,
  "type": `offer`,
  "title": `Продам книги Стивена Кинга`,
  "description": `Таких предложений больше нет! Бонусом отдам все аксессуары.  Это настоящая находка для коллекционера!`,
  "sum": 14429,
  "picture": `item03.jpg`,
  "category": [`Посуда`, `Животные`, `Машины`, `Техника`, `Игры`],
  "comments": [{
    "id": `tV-HzO`,
    "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`,
  }, {"id": `L5v96l`, "text": `А сколько игр в комплекте? А где блок питания?`}, {
    "id": `wbs2Ke`,
    "text": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого.`,
  }, {"id": `fl-4l3`, "text": ``}],
}, {
  "id": `lV1tR8`,
  "type": `sale`,
  "title": `Продам приставку Sega`,
  "description": `Даю недельную гарантию. Продаю с болью в сердце... Дешевле не найдете. Товар в отличном состоянии.`,
  "sum": 38682,
  "picture": `item16.jpg`,
  "category": [`Машины`, `Журналы`, `Разное`, `Книги`, `Игры`],
  "comments": [{
    "id": `Z-wD7h`,
    "text": `А где блок питания? С чем связана продажа? Почему так дешёво? Совсем немного...`,
  }],
}, {
  "id": `sar_gX`,
  "type": `offer`,
  "title": `Продам приставку Sega`,
  "description": ` Если найдёте дешевле — сброшу цену. Кому нужен этот новый телефон, если тут такое... Пользовались бережно и только по большим праздникам.`,
  "sum": 19583,
  "picture": `item01.jpg`,
  "category": [`Разное`, `Животные`, ``],
  "comments": [{
    "id": `ckGoi3`,
    "text": `А сколько игр в комплекте? А где блок питания? Оплата наличными или перевод на карту?`,
  }],
}, {
  "id": `AIHFWr`,
  "type": `sale`,
  "title": `Куплю антиквариат`,
  "description": `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Если товар не понравится — верну всё до последней копейки.`,
  "sum": 27239,
  "picture": `item16.jpg`,
  "category": [`Посуда`, `Разное`, `Игры`, ``],
  "comments": [{"id": `up5F8q`, "text": `Неплохо, но дорого.`}],
}, {
  "id": `J3nVfy`,
  "type": `offer`,
  "title": `Продам новую приставку Sony Playstation 5`,
  "description": `Не пытайтесь торговаться. Цену вещам я знаю. Кому нужен этот новый телефон, если тут такое... Дешевле не найдете. Мой дед не мог её сломать.`,
  "sum": 54765,
  "picture": `item05.jpg`,
  "category": [`Посуда`, `Машины`, `Животные`],
  "comments": [{"id": `VsjQCf`, "text": `Почему в таком ужасном состоянии?`}, {
    "id": `niNpHe`,
    "text": `Вы что?! В магазине дешевле.`,
  }],
}];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Продам новую приставку`
      });
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`Fg0ikD`));
});

test(`API returns code 404 if nothing is found`, () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
