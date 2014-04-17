'use strict';

var _           = require('underscore');
var utils       = require('../utils');
var translates  = require('../translates');


module.exports = function updateGoal(params, done) {
  var path        = '/1/cards/%{id}';
  var respondWith = utils.respondTo(done);

  var cardData    = translates.getCardData(params.goal.external_id);
  params.id       = cardData.id;

  var xhrOptions  = utils.requestOptions(path, params);

  var card        = translates.to('card', params.goal);
  card.idBoard    = params.urlName;

  _.extend(xhrOptions, { body: card, method: 'put' });

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var goal = translates.to('goal', body);
    respondWith({ goal: goal });
  });
};
