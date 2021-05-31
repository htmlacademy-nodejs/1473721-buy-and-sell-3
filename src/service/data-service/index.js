'use strict';

const CategoryService = require(`./category`);
const SearchService = require(`./search`);
const OfferService = require(`./offers`);
const CommentService = require(`./comments`);

module.exports = {
  CategoryService,
  CommentService,
  SearchService,
  OfferService,
};
