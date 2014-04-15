'use strict';

var utils       = require('./utils');
var translates  = require('./translates')


module.exports = function updateGoal(params, done) {
  params.id       = params.goal.external_id;
  var path        = '/1/cards/%{id}/idBoard?value=%{urlName}';

  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  var card = translate.to('card', params.goal);

  var xhrOptions  = {
    url:    url,
    method: 'put',
    data: { card : card }
  };

  utils.request(xhrOptions, function(err, res, body) {
    if(err) { return respondWith(err); }

    var goal = translates.to('goal', body);
    respondWith({ goal: goal });
  });
};
