'use strict';

var utils       = require('../utils');
var translates  = require('../translates');


module.exports = function getGoals(params, done) {
  var fields      = [ 'idList', 'name', 'desc', 'shortUrl' ].join(','); // crop response
  var path        = '/1/boards/%{urlName}/cards?filter=open&fields=' + fields;

  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  utils.request({ url: url }, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var goals = body.map(function(goal) {
      return translates.to('goal', goal);
    });

    respondWith({ goals: goals });
  });
};
