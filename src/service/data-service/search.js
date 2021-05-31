'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  async findAll(searchText) {
    return this._offers.map((offer) => offer.title.includes(searchText));
  }
}

module.exports = SearchService;
