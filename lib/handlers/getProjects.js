'use strict';

var utils       = require('./utils');
var translates  = require('./translates')


module.exports = function getProjects(params, done) {
  var path        = '/1/members/%{externalId}/boards?filter=open&fields=desc,name';
  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  utils.request({ url: url }, function(err, res, body) {
    if(err) { return respondWith(err); }

    var projects = body.map(function(project) {
      return translates.to('project', project);
    });

    respondWith({ projects: projects });
  });
};
