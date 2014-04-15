'use strict';

var connector = require('..');
var _         = require('underscore');
var helper    = require('./helpers/specHelper');
var settings  = require('./requestSettings');

describe('connector smoke suite', function() {
  var newGoalId;
  var connService = new helper.ConnService(connector);

  // the order matters:
  it('createGoal', function(done) {
    var params = helper.buildParams('createGoal');

    connService.testAction('createGoal', params, function(response) {
      helper.expectingAGoal(response);

      var goal = response.data.goal;
      var expectedGoal = settings.createGoal.goal;

      expect(goal.title).toEqual(expectedGoal.title);
      expect(goal.description).toEqual(expectedGoal.description);

      newGoalId = goal.external_id;

      done();
    });
  });

  // take just created goal id
  it('updateGoal', function(done) {
    var params = helper.buildParams('updateGoal');
    _.extend(params.goal, { external_id: newGoalId });

    connService.testAction('updateGoal', params, function(response) {
      helper.expectingAGoal(response);

      var goal = response.data.goal;
      var expectedGoal = settings.updateGoal.goal;

      expect(goal.title)      .toEqual(expectedGoal.title);
      expect(goal.description).toEqual(expectedGoal.description);

      done();
    });
  });

  it('getGoal', function(done) {
    var params = helper.buildParams('getGoal', { id: newGoalId });

    connService.testAction('getGoal', params, function(response) {
      helper.expectingAGoal(response);
      done();
    });
  });

  it('getGoals', function(done) {
    var params = helper.buildParams('getGoals');

    connService.testAction('getGoals', params, function(response) {
      helper.expectingAGoalList(response);
      done();
    });
  });

  it('getProjects', function(done) {
    var params = helper.buildParams('getProjects');

    connService.testAction('getProjects', params, function(response) {
      helper.expectingAProjectList(response);
      done();
    });
  });

  it('getUsers', function(done) {
    var params = helper.buildParams('getUsers');

    connService.testAction('getUsers', params, function(response) {
      helper.expectingAUserList(response);
      done();
    });
  });
});
