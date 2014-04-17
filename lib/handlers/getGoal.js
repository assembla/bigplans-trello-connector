'use strict';

var utils       = require('../utils');
var translates  = require('../translates');



module.exports = function getGoal(params, done) {
  var path        = '/1/boards/%{urlName}/cards/%{id}';
  var respondWith = utils.respondTo(done);

  var cardData    = translates.getCardData(params.id);
  params.id       = cardData.id;

  var xhrOptions  = utils.requestOptions(path, params);

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var goal = translates.to('goal', body);
    respondWith({ goal: goal });
  });
};
