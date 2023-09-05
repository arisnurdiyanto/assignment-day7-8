const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.createToken = (userId) => {
  return jwt.sign({ id: userId }, 'rahasia-super-rahasia', {
    expiresIn: '1h',
  });
};

exports.verifyToken = expressJwt({
  secret: 'rahasia-super-rahasia',
  algorithms: ['HS256'],
  requestProperty: 'auth',
});