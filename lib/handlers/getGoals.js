'use strict';

var utils       = require('../utils');
var translates  = require('../translates');



module.exports = function getGoals(params, done) {
  var path        = '/1/boards/%{urlName}/cards';
  var respondWith = utils.respondTo(done);

  var fields      = [ 'idList', 'name', 'shortUrl', 'desc' ]; // crop response
  var qsParams    = { filter: 'open', fields: fields.join(',') };

  var xhrOptions  = utils.requestOptions(path, qsParams, params);

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var goals = body.map(function(goal) {
      return translates.to('goal', goal);
    });

    respondWith({ goals: goals });
  });
};
