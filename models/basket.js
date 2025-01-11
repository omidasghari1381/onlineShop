//db
import mongoose, { Schema, model } from "mongoose";
//joi
import joipkg from "joi";
const { number, ref } = joipkg;



export function validateBasket(basketSchema) {
  const Schema = joi.object({
    userId: joi.objectId().required(),
    items: joi.array().items(
      joi.object({
        productId: joi.objectId().required(),
        quantity: joi.number().integer().min(1).required(),
      })
    ),
    bstatus: joi.boolean().default(false),
    totalPrice: joi.number().default(0),
  });
  return Schema;
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
      sumPrice: {
        type: Number,
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

basketSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    item.sumPrice = item.price * item.quantity;
  });
  this.totalPrice = 0;
  this.items.forEach((item) => {
    this.totalPrice += item.sumPrice;
  });
  next();
});


const basket = model("basket", basketSchema);

export default basket;
