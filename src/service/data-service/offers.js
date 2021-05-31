'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);

    this._offers.push(newOffer);
    return newOffer;
  }

  drop(offerId, commentId) {
    const offer = this._offers.find((item) => item.id === offerId);

    if (!offer) {
      return null;
    }
    return offer.comments.find((item) => item.id === commentId);
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOffer = this._offers
      .find((item) => item.id === id);
    if (oldOffer) {
      return Object.assign(oldOffer, offer);
    }
    return null;
  }

}

module.exports = OfferService;
