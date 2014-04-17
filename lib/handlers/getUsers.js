'use strict';

var utils       = require('../utils');
var translates  = require('../translates');



module.exports = function getUsers(params, done) {
  var path        = '/1/boards/%{urlName}/members';
  var respondWith = utils.respondTo(done);

  var xhrOptions  = utils.requestOptions(path, params);

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var users = body.map(function(user) {
      return translates.to('user', user);
    });

    respondWith({ users: users });
  });
};
