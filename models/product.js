//db
import mongoose, { Schema, model } from "mongoose";
//joi
import Joi, { number, ref } from "joi";

const schema = Joi.object({
  productname: Joi.string().min(2).max(100).required(),
  tag:Joi.array().items(Joi.objectId()).unique(),
  price:Joi.number().required(),
  date:Joi.string().default(Date.now).required(),
  category_ID:Joi.array().items(Joi.objectId()).required(),
  size:Joi.string().required(),
  about:Joi.string()
});

const productSchema = new Schema({
  productname: {
    type: String,
    minlengh: 2,
    maxlengh: 100,
    require: true,
  },
  tag: [{
    type: mongoose.type.objectId,
    ref:"tags",
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
    type:mongoose.type.objectId,
    ref:"category",
    require: false,
  }],
  size: [{
    type:String,
    require: true,
  }],
  about: {
    type: String,
    require: false,
  },
});

const product = new model("productSchema",productSchema)

export default {product , schema}