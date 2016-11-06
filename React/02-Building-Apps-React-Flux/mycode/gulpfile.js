'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');  // Run a local dev server
var open = require('gulp-open');  // Open a url in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // Using to concatenate css files
var eslint = require('gulp-eslint'); // Lint JS filesincluding JSX
var history = require('connect-history-api-fallback');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/**/*.html',
    homeHtml: 'index.html',
    js: './src/**/*.{js,jsx}',
    mainJs: './src/main.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/toastr.css'
    ],
    images: './src/images/*',
    dist: './dist'
  }
};

// Start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
    middleware: function(connection, options) {
      return [
        history({})
      ];
    }
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src(config.paths.dist + '/' + config.paths.homeHtml)
    .pipe(open({
      uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

// Copy html to dist and reload the page
gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify) // convert jsx to js
    .bundle() // Put it all into 1 file
    .on('error', console.error.bind(console)) // Show any errors on the console
    .pipe(source('bundle.js'))  // Define what our bundle will be named
    .pipe(gulp.dest(config.paths.dist + '/scripts'))  // Copy it to here
    .pipe(connect.reload());  // Reload any changes in the browser
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'))
      .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
  // Need to return the results so can see the results of our linting.
  return gulp.src(config.paths.js)
             .pipe(eslint({config: 'eslint.config.json'}))
             .pipe(eslint.format());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
