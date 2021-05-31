'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offerId, comment) {
    const newComment = Object
      .assign({id: nanoid(MAX_ID_LENGTH)}, comment);
    this.findAll(offerId).push(newComment);
    return newComment;
  }

  async drop(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  findAll(offerId) {
    return this._offers.find((element) => element.id === offerId).comments;
  }
}

module.exports = CommentService;
