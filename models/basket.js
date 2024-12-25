//db
import mongoose, { Schema, model, JoiBase } from "mongoose";
//joi
import Joi, { boolean, number } from "joi";
//updatedAt
import basket from "../middleware/updatedAt";
//joi-objectid
import joiObjectId from "joi-objectid";
const Joi = JoiBase.extend(joiObjectId);

function basketValidate(basketSchema) {
  const Schema = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.objectId().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    ),
    totalPrice: Joi.number().min(0).required(),
  });
  return Schema
}

const basketSchema = new Schema({
  userId: {
    type: mongoose.Typse.ObjectId,
    ref: "user",
    require: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
        min: 1,
      },
      price: {
        type: Number,
        require: true,
        default: 0,
      },
    },
  ],
  sumprice: {
    type: Number,
    require: true,
    default: 0,
  },
  bStatus: {
    type: boolean,
    default: false,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const basket = new model("basketSchema", basketSchema);

export default { basket, basketValidate };
