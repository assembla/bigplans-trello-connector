'use strict';

var helper = require('bp-connector-helper');


translator.ruleFor('goal', function(card) {
  return {
    title:        card.name,
    description:  card.desc,
    external_id:  card.idList,
  };
});


translator.ruleFor('card', function(goal) {
  var card = {
    name:   goal.title,
    desc:   goal.description,
  };

  if(goal.idList) {
    card.idList = goal.idList;
  } else if(goal.external_id) {
    card.idList = goal.external_id;
  }

  return card;
});


translator.ruleFor('user', function(extUser) {
  return {
    login:        extUser.username,
    full_name:    extUser.fullName,
    external_id:  extUser.id
  };
});


translator.ruleFor('project', function(board) {
  return {
    name:    board.name,
    urlName: board.id
  };
});

module.exports = translator;
