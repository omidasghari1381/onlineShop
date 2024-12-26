//usermodel
import user from "../models/user.js";
//userdatavalidation
import schema from "../middleware/userdatavalidation.js";
//bcrypt
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function register(req, res) {
  const userValidation = schema.validate(req.body);
  if (userValidation.error) {
    return res
      .status(401)
      .send(userValidation.error.details.map((detail) => detail.message));
  }
  try {
    req.body.password = await hashPassword(req.body.password);
    const newUser = new user(req.body);
    await newUser.save();
    console.log("user saved");
    res.send(newUser).status(200);
  } catch (error) {
    console.log(error);
    res.status(409).send("user already exists");
  }
}

export default register;
