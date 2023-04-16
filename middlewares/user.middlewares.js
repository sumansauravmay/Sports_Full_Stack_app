const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(req.headers)
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      const userID = decoded.userID;
      // console.log(decoded)
      req.body.userID = userID;
      next();
    } else {
      res.send("Login first please1");
    }
  } else {
    res.send("Login first please2");
  }
};

module.exports = { authenticate };
