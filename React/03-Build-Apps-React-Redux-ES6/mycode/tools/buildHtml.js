'use strict';
// Comes with node and helps interact with the file system.
import fs from 'fs';
// cheerio creates an in memory DOM so we can manipulate it.
import cheerio from 'cheerio';
import colors from 'colors';

// Build file so allow console
/*eslint-disable no-console*///

fs.readFile('src/index.html', 'utf-8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // Since a seperate stylesheet is only utilised for the production Build
  // need to dynamically add it here.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
