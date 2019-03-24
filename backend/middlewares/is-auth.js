const jwt = require("jsonwebtoken");
const { secret } = require("../config/keys");

module.exports = (req, res, next) => {
  //check for Authorization in the Header if not they have not sent a token
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  //they have a token but lets verify to see if its valid
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      secret
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  //the token is valid so let us extract some info $ store it in the req. body
  req.id = decodedToken.id;
  req.name = decodedToken.name;
  req.avatar = decodedToken.avatar;
  next();
};
