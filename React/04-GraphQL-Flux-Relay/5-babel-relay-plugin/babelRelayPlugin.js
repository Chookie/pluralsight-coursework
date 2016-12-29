// https://facebook.github.io/relay/docs/guides-babel-plugin.html#Advanced_Usage
const getBabelRelayPlugin = require('babel-relay-plugin');

const schemaData = require('./data/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);
