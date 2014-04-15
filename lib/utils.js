'use strict';

var helper = require('bp-connector-helper');

var baseUrl;
module.exports.baseUrl = baseUrl = 'https://api.trello.com';


module.exports.withBasePath = function withBasePath(path) {
  return baseUrl + path;
};


module.exports.withAuth = function withAuth(path) {
  path = withBasePath(path);

  var hasQuery    = path.indexOf('?') !== -1;
  var prefix      = hasQuery ? '&' : '?';
  var authParams  = prefix + 'key=%{appKey}&token=%{accessToken}';

  return path + authParams;
};


module.exports.applyPathParams = function applyPathParams(path, params) {
  var path = withAuth(path);
  return helper.applyParams(path, params);
};


module.exports.request = function request(options, done) {
  var options   = options || {};
  options.json  = true;

  return helper.request(options, done);
};


module.exports.respondTo = function respondTo(callback) {
  return function(data) {
    var result = helper.decorator.toJsend(data);
    callback(result);
  };
};
