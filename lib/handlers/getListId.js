'use strict';

var _           = require('underscore');
var utils       = require('../utils');
var helper      = require('bp-connector-helper');

var self = {};

function getValidList(arr) {
  // try to get 'Current' list
  var list = _(arr).find(function(item) {
    return /current/i.test(item);
  });

  // take first (most left) if not present:
  return list || arr[0];
}


function getListId(next) {
  // goto '/1/boards/[board_id]/lists?filter=open', to get open lists
  var qsParams    = { filter: 'open' };
  var xhrOptions  = utils.requestOptions('/1/boards/%{urlName}/lists', qsParams, self.params);

  utils.request(xhrOptions, function(err, res, body) {
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
