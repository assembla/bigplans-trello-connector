'use strict';

var helper      = require('bp-connector-helper');
var translator  = helper.translator;


function getGoalStatus(card) {
  return card.closed ? 2 : 0;
}


function cardIsClosed(goal) {
  return goal.status > 1;
}


function setGoalId(card) {
  return card.id + ',' + card.idList;
}


function getCardData(externalId) {
  var data = externalId.split(',');
  return {
    id:     data[0],
    idList: data[1]
  };
}


translator.ruleFor('goal', function(card) {
  return {
    title:        card.name,
    description:  card.desc,
    status:       getGoalStatus(card),
    link:         card.shortUrl,
    external_id:  setGoalId(card)
  };
});


translator.ruleFor('card', function(goal) {
  var data = module.exports.getCardData(goal.external_id || '');
  var card = {
    name:   goal.title,
    desc:   goal.description,
    closed: cardIsClosed(goal),
    idList: data.idList
  };

  return card;
});


translator.ruleFor('user', function(extUser) {
  return {
    login:        extUser.username,
    full_name:    extUser.fullName,
    email:        extUser.email,
    external_id:  extUser.id
  };
});


translator.ruleFor('project', function(board) {
  return {
    name:    board.name,
    urlName: board.id
  };
});

module.exports              = translator;
module.exports.getCardData  = getCardData;
