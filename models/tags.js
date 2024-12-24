//db
import { Schema, model } from "mongoose";
//joi
import Joi, { required } from "joi";

const tagsSchema = new Schema({
  name: {
    type: String,
    minlengh: 3,
    maxlengh: 30,
    required: true,
  },
});

const schema = Joi.object({
  name: Joi.string().max(30).min(3).required(),
});

const tags = new model("tagsSchema", tagsSchema);
export default { schema, tags };
