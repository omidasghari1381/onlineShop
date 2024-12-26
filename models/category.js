//db
import { Schema, model } from "mongoose";
//joi
import Joi from "joi";

const categorySchema = new Schema({
  name: {
    type: String,
    minlengh: 3,
    maxlengh: 30,
    required: true,
    trim:true,
  },
});

const schema = Joi.object({
  name: Joi.string().max(30).min(3).required().trim(),
});

const category = new model("categorySchema", categorySchema);
export default { schema, tags };
