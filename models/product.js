//db
import mongoose, { Schema, model } from "mongoose";
//joi
import Joi, { number, ref } from "joi";

const schema = Joi.object({
  productname: Joi.string().min(2).max(100).required(),
  tag
});

const productSchema = new Schema({
  productname: {
    type: String,
    minlengh: 2,
    maxlengh: 100,
    require: true,
  },
  tag: [{
    type: String,
    minlengh: 3,
    maxlengh: 50,
    require: true,
  }],
  price: {
    type: number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default:Date.now(),
  },
  category_ID: [{
    type:mongoose.type.categoryID,
    ref:category,
    require: false,
  }],
  size: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: false,
  },
});
