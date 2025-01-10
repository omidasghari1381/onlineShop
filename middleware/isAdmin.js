import user from "../models/user.js";

async function isAdmin(req, res, next) {
  try {
    const id = req.userId.id;
    const User = await user.findById(id);

    if (User && User.role === "admin") {
      return next();
    }

    res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
}

export default isAdmin;
