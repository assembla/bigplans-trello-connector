'use strict';

var utils       = require('./utils');
var translates  = require('./translates')


module.exports = function getGoal(params, done) {
  var path        = '/1/boards/%{urlName}/cards/%{id}';
  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  utils.request({ url: url }, function(err, res, body) {
    if(err) { return respondWith(err); }

    var goal = translates.to('goal', body);
    respondWith({ goal: goal });
  });
};
