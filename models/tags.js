//db
import { Schema, model } from "mongoose";
//joi
import Joi from "joi";

const tagsSchema = new Schema({
  tagName: {
    type: String,
    minlengh: 3,
    maxlengh: 20,
    require: true,
    unique: true,
    trim: true,
  }
});

export function validateTags(tagsSchema) {
  const schema = Joi.object({
    tagName: Joi.string().min(3).max(30).required().unique()
  });
  return schema.validate(tagsSchema);
}

const tagsModel = model("tagsSchema", tagsSchema);

export default tagsModel;
