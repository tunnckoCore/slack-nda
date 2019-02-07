'use strict';

const { text, send } = require('micro');
const { parse } = require('querystring');
const generate = require('./lib/generate');
const upload = require('./lib/upload');

module.exports = async (req, res) => {
  const body = parse(await text(req));
  let result = null;

  try {
    // Pass code to function imported through eval
    const options = await generate(body.text);
    result = await upload(options);
  } catch (err) {
    send(res, 200, {
      text: `Generation failed: ${err.message}`,
      attachments: [{ text: err.stack }],
    });

    return;
  }

  if (!result.ok) {
    send(res, 200, {
      text: `Generation failed: ${result.error}`,
    });
    return;
  }

  send(res, 200, {
    text: `Generated Non-Disclosure Agreement: ${result.file.permalink}`,
  });
};
