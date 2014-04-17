'use strict';

var _           = require('underscore');
var utils       = require('../utils');
var translates  = require('../translates');
var getListId   = require('./getListId');

module.exports = function createGoal(params, done) {
  var path        = '/1/cards';
  var respondWith = utils.respondTo(done);

  getListId(params).then(function() {
    var card    = translates.to('card', params.goal);
    card.idList = params.idList;

    var xhrOptions = utils.requestOptions(path, params);
    _.extend(xhrOptions, { body: card, method: 'post' });

    utils.request(xhrOptions, function(err, res, body) {
      if(utils.isRequestError(err, res)) {
        return respondWith(err || body);
      }

      var goal = translates.to('goal', body);
      respondWith({ goal: goal });
    });
  })
  .fail(respondWith);
};
