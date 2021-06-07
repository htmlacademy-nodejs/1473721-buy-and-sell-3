'use strict';

const {Router} = require(`express`);
const category = require(`./category`);
const offers = require(`./offers`);
const search = require(`./search`);
const {CategoryService, SearchService, OfferService, CommentService} = require(`../data-service`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  offers(app, new OfferService(mockData), new CommentService(mockData));
})();


module.exports = app;
