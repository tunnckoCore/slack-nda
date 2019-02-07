'use strict';

// from: https://github.com/zeit/now-examples/blob/master/slack-eval/oauth.js

// TODO: use `slack` module

const fetch = require('axios');
const { parse } = require('querystring');

module.exports = async (req, res) => {
  // Extract code received on the request url
  const urlQueryString = req.url.replace(/^.*?/, '');
  const { code } = parse(urlQueryString);

  // Compose authHeader by encoding the string ${client_id}:${client_secret}
  const clientId = process.env.SLACK_CLIENT_ID;
  const clientSecret = process.env.SLACK_CLIENT_SECRET;
  const Authorization = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`,
  ).toString('base64')}`;

  // Hit oauth.access for access_token
  const oauthAccess = await fetch('https://slack.com/api/oauth.access', {
    method: 'POST',
    data: { code },
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // eslint-disable-next-line camelcase
  const { access_token } = await oauthAccess.json();

  // Hit auth.test for slack domain
  const authTest = await fetch('https://slack.com/api/auth.test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`, // eslint-disable-line camelcase
    },
  });
  const { url: slackUrl } = await authTest.json();

  // Send redirect response to slack domain
  res.writeHead(302, 'Redirect', { Location: slackUrl });
  res.end();
};
