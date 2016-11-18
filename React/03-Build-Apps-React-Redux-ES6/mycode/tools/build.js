'use strict';

// More info on Webpacks's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colours from 'colors';

// Tell Babel to transpile in production mode.
// So it will ensure no hot reloading code is included in the production build..
process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via Webpack.  This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  console.log('AAAAA');
  if (err) { // A fatal error occurred.  Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    return jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log('Webpack stats: ${stats}');

  // If we got this far, the build succeeded.
  console.log("Your app has been compiled in production mode and written to /dist.  It\'s ready to roll!".green);

  return 0;
});
