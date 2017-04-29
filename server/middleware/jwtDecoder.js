var jwt_decode = require('jwt-decode');

exports.jwtDecoder = function(req, res, next) {
  console.log(JSON.stringify(req.headers));
  try {
    var authzHeader = req.headers['authorization'];
    if (authzHeader) {
      var token = jwt_decode(authzHeader.split('Bearer')[1].trim());
      console.log(token.email);
      req.user_id = token.email;
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return next();
};
