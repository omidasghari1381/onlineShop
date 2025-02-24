//JWT
import jwt from "jsonwebtoken";
//.env
import "dotenv/config";

function auth(req, res, next) {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).send("no token was provided");
  }
  jwt.verify(token, process.env.PASSWORD_HASH_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");
    req.userId = decoded;
    next();
  });
}

export default auth;
