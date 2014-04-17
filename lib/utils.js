'use strict';

var _       = require('underscore');
var helper  = require('bp-connector-helper');

module.exports.baseUrl = 'https://api.trello.com';


function withBasePath(path) {
  return module.exports.baseUrl + path;
}

function authParams(params) {
  return {
    key:    params.key,
    token:  params.token
  };
}


module.exports.requestOptions = function requestOptions(path, qsParams, params) {
  if(!params) {
    params    = qsParams;
    qsParams  = {};
  }

  path = withBasePath(path);

  var uri = helper.applyParams(path, params);
  var qs  = _.extend({}, authParams(params), qsParams);

  return { uri: uri, qs: qs };
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
