//db
import mongoose, { Schema, model, JoiBase } from "mongoose";
//joi
import Joi, { number, ref } from "joi";
//updatedAt
import product from "../middleware/updatedAt";
//joi-objectid
import joiObjectId from "joi-objectid";
const Joi = JoiBase.extend(joiObjectId);

function productValidate(productSchema) {
  const schema = Joi.object({
    productname: Joi.string().min(2).max(100).required().trim(),
    tag: Joi.array().items(Joi.objectId()).unique().required(),
    price: Joi.number().required().min(0),
    date: Joi.date().default(Date.now).required(),
    updateAt: Joi.date().default(Date.now()),
    stock: Joi.number().min(0).required(),
    category_ID: Joi.array().items(Joi.objectId()).required(),
    size: Joi.string()
      .required()
      .valid("XS", "S", "M", "L", "XL", "XXL", "XXXL"),
    about: Joi.string(),
    image: Joi.array().items(Joi.string()),
  });
  return schema.validate(productSchema);
}

const productSchema = new Schema({
  productname: {
    type: String,
    minlengh: 2,
    maxlengh: 100,
    require: true,
    trim: true,
  },
  tag: [
    {
      type: mongoose.Types.objectId,
      ref: "tags",
      require: true,
      unique: true,
    },
  ],
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    require: true,
    min: 0,
  },
  category_ID: [
    {
      type: mongoose.Types.objectId,
      ref: "category",
      require: false,
    },
  ],
  sizes: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    require: true,
  },
  about: {
    type: String,
    require: false,
  },
  image: {
    type: [String],
    require: false,
  },
});

productSchema.pre("save", product);

const product = new model("productSchema", productSchema);

export default { product, productValidate };
