'use strict';

var utils       = require('../utils');
var helper      = require('bp-connector-helper');
var _           = require('underscore');

var self = {};

function getValidList(arr) {
  // try to get Current list
  var list = _(arr).find(function(item) {
    return /current/i.test(item);
  });

  // take first (most left) if not present:
  return list || arr[0];
}

function getListId(next) {
  // goto '/1/boards/[board_id]/lists?filter=open', to get open lists
  var url = utils.applyPathParams('/1/boards/%{urlName}/lists?filter=open', self.params);

  utils.request({ uri: url }, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return next(err || body);
    }

    var list = getValidList(body);

    if(!list) {
      var message = 'could not find open LIST for <projectId>: urlName#' + self.params.urlName;
      next(new Error(message));
    }

    // append idList to the NEW CARD
    self.params.idList = list.id;
    next();
  });
}

module.exports = function(params) {
  self.params = params;
  return helper.promise(getListId);
};
