'use strict';

var _         = require('underscore');
var settings  = require('../requestSettings');


// expectations
function expectingSuccess(response) {
  expect(response.status).toEqual('success');
  expect(response.message).toEqual('');
  expect(response.data).toBeDefined();
}


function expectingAUserList(response) {
  expectingSuccess(response);
  var data = response.data.users;

  expect(data).toEqual(jasmine.any(Array));

  var user = data[0];
  expect(user).toBeDefined();

  expect(user.login).toBeDefined();
}


function expectingAProjectList(response) {
  expectingSuccess(response);
  var data = response.data.projects;

  expect(data).toBeDefined();
  var project = data[0];

  expect(project).toBeDefined();

  expect(project.name).toBeDefined();
  expect(project.urlName).toBeDefined();
}


function expectingAGoalObject(obj) {
  expect(obj.title).toBeDefined();
  expect(obj.description).toBeDefined();
  expect(obj.external_id).toMatch(/[0-9]+/);
  expect(obj.status).toMatch(/[0-2]/);
  expect(obj.link).toBeDefined();
}


function expectingAGoal(response) {
  expectingSuccess(response);
  var data = response.data.goal;

  expectingAGoalObject(data);
}

function expectingAGoalList(response) {
  expectingSuccess(response);
  var data = response.data.goals;

  expect(data).toEqual(jasmine.any(Array));

  var goal = data[0];
  expect(goal).toBeDefined();
  expectingAGoalObject(goal);
}
// expectations END


function ConnService(connector) {
  this.connector = connector;
}

ConnService.prototype.testAction =function testAction(name, params, expectation) {
  this.connector[name](params, expectation);
};


function buildParams(mixin, data) {
  mixin = settings[mixin] || {};
  return _.extend({}, settings.auth, mixin, data);
}

module.exports.ConnService            = ConnService;
module.exports.expectingAGoalList     = expectingAGoalList;
module.exports.expectingAGoal         = expectingAGoal;
module.exports.expectingAUserList     = expectingAUserList;
module.exports.expectingAProjectList  = expectingAProjectList;

module.exports.buildParams            = buildParams;
