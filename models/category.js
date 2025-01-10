//db
import { Schema, model } from "mongoose";
//joi
import Joi from "joi";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    minlengh: 3,
    maxlengh: 30,
    require: true,
    trim: true,
    unique:true,
  },
});

export function validateCategory(categorySchema) {
  const schema = Joi.object({
    categoryName: Joi.string().max(30).min(3).required().unique(),
  });
  return schema.validate(categorySchema);
}
const categoryModel = model("category", categorySchema);
export default categoryModel;
