'use strict';

const path = require('path');
const dateformat = require('dateformat');
const createReport = require('docx-templates');

module.exports = function generateOutput(name, today) {
  const date = today || dateformat(Date.now(), 'mmmm dS, yyyy');

  const settings = {
    template: path.resolve(__dirname, 'input.docx'),
    output: path.resolve(__dirname, 'output.docx'),
    data: { name, date },
  };

  createReport(settings);

  return settings;
};

// generateOutput({
//   name: 'foobar',
// });
