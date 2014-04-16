'use strict';

var utils       = require('../utils');
var translates  = require('../translates');

// quite tricky to get user_email . . . (GET members/[ID]/email to get email field)
/* have to traverse users at project
  and perform a separate request for each one, to get email field

  utils.request(xhrOpts, function(data, res, done) {
    data.forEach(function(trelloUser) {
      // GET members/[trelloUser.id]/email => {id, email}
    })
  }
*/
module.exports = function getUsers(params, done) {
  var path        = '/1/boards/%{urlName}/members';

  var url         = utils.applyPathParams(path, params);
  var respondWith = utils.respondTo(done);

  utils.request({ url: url }, function(err, res, body) {
    if(utils.isRequestError(err, res)) {
      return respondWith(err || body);
    }

    var users = body.map(function(user) {
      return translates.to('user', user);
    });

    respondWith({ users: users });
  });
};
