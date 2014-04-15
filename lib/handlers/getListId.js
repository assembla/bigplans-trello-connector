'use strict';

var utils       = require('./utils');
var helper      = require('bp-connector-helper');
var _           = require('underscore');

var self = {};

function getListId(next) {
  // goto '/1/boards/[board_id]/lists?filter=open', to get open lists
  var url = utils.applyPathParams('/1/boards/%{urlName}/lists?filter=open', self.params);

  var xhrOptions = {
    uri: url,
    qs: _.omit(self.params, 'boardId') // pick here is better
  };

  utils.request(xhrOptions, function(err, res, body) {
    var list = body[0];

    if(!list) {
      var message = 'could not find open LIST for <projectId>: urlName#' + boardId;
      next(new Error(message));
    }

    // append idList to the NEW CARD
    var goal = self.params.goal;
    goal.idList = list.id;

    next();
  });
}

module.exports = function(params) {
  self.params = params;
  return helper.promse(getListId);
}