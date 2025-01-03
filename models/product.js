//db
import pkg from "mongoose";
const { Schema, model, JoiBase } = pkg;
//joi
import joipkg from "joi";
const { number, ref } = joipkg;
//updatedAt
import product from "../middleware/updatedAtPro.js";
//joi-objectid
import joiObjectId from "joi-objectid";
//mongoose
import mongoose from "mongoose";

// const joi = JoiBase.extend(joiObjectId);

const productSchema = new Schema({
  productname: {
    type: String,
    minlengh: 2,
    maxlengh: 100,
    require: true,
    trim: true,
  },
  tag: {
    require: true,
    type: [String],
    // ref: "tags",
  },
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  date: {
    type: Date,
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
      type: mongoose.Schema.Types.ObjectId,
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

export function validateProduct(productSchema) {
  const schema = joi.object({
    productname: joi.string().min(2).max(100).required().trim(),
    tag: joi.string.required(),
    price: joi.number().required().min(0),
    date: joi.date().default(Date.now),
    updateAt: joi.date().default(Date.now()),
    stock: joi.number().min(0).required(),
    category_ID: joi.array().items(joi.objectId()).required(),
    size: joi
      .string()
      .required()
      .valid("XS", "S", "M", "L", "XL", "XXL", "XXXL"),
    about: joi.string(),
    image: joi.array().items(joi.string()),
  });
  return schema.validate(productSchema);
}

productSchema.pre("save", product);

const productModel = model("product", productSchema);
export default productModel;
