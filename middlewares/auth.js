const { validateToken } = require("../services/authentication");

function checkForAuthCookie(coockieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[coockieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (err) {}
    next();
  };
}

module.exports = { checkForAuthCookie };
