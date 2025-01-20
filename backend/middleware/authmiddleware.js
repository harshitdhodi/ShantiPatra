const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("can't redirect to another page:anauthorized user")
      throw new Error("Unauthenticated user");
    }
    const decodeToken = await jwt.verify(token, "secret");
    req.newAdmin = decodeToken.id;
    next();
  }
  catch (err) {
    console.log(err)
    console.log("cant redirect to another page : invalid user");
    res.sendStatus(403);
  }
};

module.exports = { requireAuth };