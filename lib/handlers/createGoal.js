'use strict';

var utils       = require('./utils');
var translates  = require('./translates')
var getListId   = require('./getListId');

module.exports = function createGoal(params, done) {
  var path        = '/1/cards/idBoard';
  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  getListId(params).then(function() {
    var card        = translate.to('card', params.goal);
    var xhrOptions  = {
      url:    url,
      method: 'post',
      data: { card : card }
    };

    utils.request(xhrOptions, function(err, res, body) {
      if(err) { return respondWith(err); }

      var goal = translates.to('goal', body);
      respondWith({ goal: goal });
    });
  })
  .fail(respondWith);
};
