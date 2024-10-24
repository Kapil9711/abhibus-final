const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    if (req.headers["authorization"]) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }
    req.id = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticateUser;
