'use strict';

var utils       = require('../utils');
var translates  = require('../translates');


module.exports = function updateGoal(params, done) {
  var path        = '/1/cards/%{id}';

  var cardData    = translates.getCardData(params.goal.external_id);
  params.id       = cardData.id;

  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  var card        = translates.to('card', params.goal);
  card.idBoard    = params.urlName;

  var xhrOptions  = {
    url:    url,
    body:   card,
    method: 'put'
  };

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var goal = translates.to('goal', body);
    respondWith({ goal: goal });
  });
};
