'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../httpCode`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, offerService, commentService) => {
  const route = new Router();

  app.use(`/offers`, route);

  // GET /api/offers — ресурс возвращает список объявлений;
  route.get(`/`, async (req, res) => {
    const result = await offerService.findAll();

    if (!result) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found offers`);
    }

    return res.status(HttpCode.OK).json(result);
  });

  // GET /api/offers/:offerId — возвращает полную информацию определённого объявления;
  route.get(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // POST /api/offers — создаёт новое объявление;
  route.post(`/`, offerValidator, async (req, res) => {
    const offer = await offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  // PUT /api/offers/:offerId — редактирует определённое объявление;
  route.put(`/:offerId`, offerValidator, async (req, res) => {
    const {offerId} = req.params;

    const update = await offerService.update(offerId, req.body);

    if (!update) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .send(`Updated`);
  });

  // DELETE /api/offers/:offerId — удаляет определённое объявление;

  route.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;

    const offer = await offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // GET /api/offers/:offerId/comments — возвращает список комментариев определённого объявления;
  route.get(`/:offerId/comments`, offerExist(offerService), async (req, res) => {
    const {offerId} = req.params;

    const comments = await commentService.findAll(offerId);

    res.status(HttpCode.OK)
      .json(comments);
  });

  // DELETE /api/offers/:offerId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором;
  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), async (req, res) => {
    const {offerId, commentId} = req.params;
    const deleted = await commentService.drop(offerId, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  // POST /api/offers/:offerId/comments — создаёт новый комментарий;
  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], async (req, res) => {
    const {offerId} = req.params;
    const comment = await commentService.create(offerId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
