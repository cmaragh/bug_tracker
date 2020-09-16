const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedAndVerified = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedAndVerified;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Auth failed" });
  }
};
