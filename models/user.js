//db
import { Schema, model } from "mongoose";
//joi
import Joi from "joi";
//validateEmail
import validateEmail from "../middleware/validateEmail.js";

const complexityOption = {
  min: 5,
  max: 32,
  loweCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementcount: 2,
};


const userSchema = new Schema({
  username: {
    type: String,
    minlengh: 3,
    maxlengh: 20,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlenth: 320,
    require: true,
    validate: [validateEmail, "please enter your email properly"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 60,
    maxlenth: 60,
    require: true,
  },
  role: {
    type: String,
    default:"client"
  },
});

export function validateUser(userSchema) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .min(3)
      .max(320)
      .required()
      .pattern(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      ),
    password: passwordComplexity(complexityOption).required(),
    role: Joi.string().default("client")
  });
  return schema.validate(userSchema);
}

const user = model("username", userSchema);

export default user;
