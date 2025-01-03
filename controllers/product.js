import validateProduct  from "../models/product.js";
import productModel  from "../models/product.js";


let validate = validateProduct()


async function addProduct(req, res) {
  const validateProduct = validate.validate(req.body);
  if (validateProduct.error) {
    return res
      .status(401)
      .send(validateProduct .error.details.map((detail) => detail.message));
  }
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    console.log("Product saved");
    res.send(newProduct).status(200);
  } catch (error) {
    console.log(error);
    res.status(409).send("product didn't save");
  }
}

export default addProduct;
