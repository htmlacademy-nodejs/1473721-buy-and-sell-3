'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_ID_LENGTH = 6;
const DEFAULT_COUNT_OFFERS = 1;
const NUMBER_FOR_RADIX = 10;
const MAX_COUNT_OFFERS = 1000;
const MAX_COMMENTS = 4;
const API_PREFIX = `/api`;

const ExitCode = {
  success: 0,
  error: 1
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  MAX_ID_LENGTH,
  DEFAULT_COUNT_OFFERS,
  NUMBER_FOR_RADIX,
  MAX_COUNT_OFFERS,
  MAX_COMMENTS,
  API_PREFIX
};
