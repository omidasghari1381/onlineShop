import validateCategory from "../models/category.js";
import categoryModel from "../models/category.js";

let validate = validateCategory();

async function addCategory(req, res) {
  const validateCategory = validate.validate(req.body);
  if (validateCategory.error) {
    return res
      .status(401)
      .send(validateCategory.error.details.map((detail) => detail.message));
  }
  try {
    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    console.log("category saved");
    res.send(newCategory).status(200);
  } catch (error) {
    console.log(error);
    res.status(409).send("category didn't save");
  }
}

export default addCategory;
