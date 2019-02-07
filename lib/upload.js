'use strict';

const fs = require('fs');
const slack = require('slack');

module.exports = async (options = {}) => {
  const token = process.env.SLACK_ACCESS_TOKEN;

  return slack.files.upload({
    token,
    file: fs.createReadStream(options.output),
  });
};
