'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRouter = require(`./routes/main-routes`);
const offersRouter = require(`./routes/offers-routes`);
const myRouter = require(`./routes/my-routes`);
const chalk = require(`chalk`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.error(`Ошибка при создании сервера`, err);
  }

  return console.info(chalk.green(`Ожидаю соединений на ${DEFAULT_PORT}`));
});
