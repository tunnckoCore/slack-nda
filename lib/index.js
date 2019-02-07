// const { text } = require('micro');
// const { parse } = require('querystring');
// const generateOutput = require('./generate');

// module.exports = async (req, res) => {
//   // TODO: check if `body.text` includes the command itself (the `/nda` part), but i don't think so.
//   const body = parse(await text(req));

//   let res = null;
//   const message = null;
//   const attachments = null;

//   try {
//     // Generate docx file from input.docx template

//     // TODO: check slack api, if it accepts buffer attachments
//     // ! if so use `output: 'buffer'` in generate.js and return it,
//     // ! instead of creating a `output.docx` file.
//     res = await generateOutput({ name: body.text });

//     // message = `Generated Non-Disclosure Agreement for ${body.text}`;
//     // attachments = [{ text: result }];
//   } catch (err) {
//     // eslint-disable-next-line prefer-destructuring
//     // message = `Generation failed: ${err.message}`;
//     // attachments = [{ text: err.stack }];
//   }

//   res.writeHead(200, { 'Content-Type': 'application/json' });

//   const result = JSON.stringify({
//     response_type: 'in_channel',
//     text: message,
//     attachments,
//   });

//   // Send back to Slack
//   res.end(result);
// };
