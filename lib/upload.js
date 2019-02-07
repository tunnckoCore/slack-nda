'use strict';

const fs = require('fs');
const proc = require('process');
const slack = require('slack');

module.exports = async (options = {}) => {
  const token = proc.env.SLACK_ACCESS_TOKEN;

  return slack.files.upload({
    token,
    file: fs.createReadStream(options.output),
  });
};
