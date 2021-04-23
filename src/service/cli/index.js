'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help
};

module.exports = {
  Cli
};
