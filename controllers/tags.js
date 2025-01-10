import validateTags  from "../models/tags.js";
import tagsModel  from "../models/tags.js";

let validate = validateTags()

async function addTag(req, res) {
  const validateTags = validate.validate(req.body);
  if (validateTags.error) {
    return res
      .status(401)
      .send(validateTags .error.details.map((detail) => detail.message));
  }
  try {
    const newTag = new tagsModel(req.body);
    await newTag.save();
    console.log("tag saved");
    res.send(newTag).status(200);
  } catch (error) {
    console.log(error);
    res.status(409).send("tag didn't save");
  }
}

export default addTag;
