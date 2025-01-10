//db
import mongoose, { Schema, model} from "mongoose";
//joi
import joipkg from "joi";
const { number, ref } = joipkg;
//joi-objectid
import joiObjectId from "joi-objectid";
// const Joi = JoiBase.extend(joiObjectId);

export function validateBasket(basketSchema) {
  const Schema = joi.object({
    userId: joi.objectId().required(),
    items: joi.array().items(
      joi.object({
        productId: joi.objectId().required(),
        quantity: joi.number().integer().min(1).required(),
      })
    ),
    bstatus : joi.boolean().default(false)
  });
  return Schema
}

const basketSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
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
  totalPrice: {
    type: Number,
    default: 0,
  },
  bStatus: {
    type: Boolean,
    default: false,
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

const basket = model("basket", basketSchema);

export default basket
