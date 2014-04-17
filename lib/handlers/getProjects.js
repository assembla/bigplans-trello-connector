'use strict';

var utils       = require('../utils');
var translates  = require('../translates');



module.exports = function getProjects(params, done) {
  var path        = '/1/members/%{userId}/boards';
  var respondWith = utils.respondTo(done);

  var fields      = [ 'name', 'desc' ]; // crop response
  var qsParams    = { filter: 'open', fields: fields.join(',') };

  var xhrOptions  = utils.requestOptions(path, qsParams, params);

  utils.request(xhrOptions, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var projects = body.map(function(project) {
      return translates.to('project', project);
    });

    respondWith({ projects: projects });
  });
};
