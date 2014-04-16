'use strict';

var helper = require('bp-connector-helper');

module.exports.baseUrl = 'https://api.trello.com';


module.exports.withBasePath = function withBasePath(path) {
  return module.exports.baseUrl + path;
};


module.exports.withAuth = function withAuth(path) {
  path = module.exports.withBasePath(path);

  var hasQuery    = path.indexOf('?') !== -1;
  var prefix      = hasQuery ? '&' : '?';
  var authParams  = prefix + 'key=%{key}&token=%{token}';

  return path + authParams;
};


module.exports.applyPathParams = function applyPathParams(path, params) {
  path = module.exports.withAuth(path);
  return helper.applyParams(path, params);
};


module.exports.request = function request(options, done) {
  options       = options || {};
  options.json  = true;

  return helper.request(options, done);
};

module.exports.isRequestError = function isRequestError(err, res) {
  return err || res.statusCode !== 200;
};

module.exports.respondTo = helper.respondTo;
