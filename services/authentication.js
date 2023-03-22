const JWT = require("jsonwebtoken");

const secret = "$upermanVSbatman";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const paylod = JWT.verify(token, secret);

  return paylod;
}

module.exports = { createTokenForUser, validateToken };
