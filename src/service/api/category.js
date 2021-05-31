'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../httpCode`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/category`, route);

  // GET /api/categories — возвращает список категорий;
  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    console.log(HttpCode);
    res.status(HttpCode.OK)
      .json(categories);
  });
};
