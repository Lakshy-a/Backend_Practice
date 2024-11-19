import { Product } from "../../models/product.model.js";
import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";

// 1. destructure the body and fetch data
// 2. check if eny field is empty or not
// 3. check if the product with same name already exist
// 4. if no product exist then create new one and save it to the db
// 5, after successfully adding product send the success response

const postNewProduct = async (req, res) => {
  // desctructure body
  const {
    productName,
    productDescription,
    productCategory,
    productSubCategory,
    productPrice,
    productDiscountedPrice,
    stockQuantity,
    availableSizes,
    availableColors,
    isFeatured,
    isNewCollection,
  } = req.body;

  try {
    // check if any field is empty
    const isEmpty = [
      productName,
      productDescription,
      productCategory,
      productSubCategory,
      productPrice,
      productDiscountedPrice,
      stockQuantity,
      availableSizes,
      availableColors,
      isFeatured,
      isNewCollection,
    ].some((element) => element === undefined || element === null);
    if (isEmpty) {
      return errorResponse(res, 400, "Every field is required");
    }

    // check if any product with same name exist
    const doProductExist = await Product.findOne({ productName });
    if (doProductExist) {
      return errorResponse(res, 400, "Product already exist");
    }

    // fetch the files uploaded from req and take the path of file in another array
    const productImages = req.files;
    const localPath = productImages.map((file) => file.path);

    // check if the files are uplaoded to local destination or not
    if (!localPath) return errorResponse(res, 400, "No image uploaded");

    // uplaod the files from localpath to cloudinary, cloudinary will return a promise with some information for every file uploaded to it, save it to cloudinaryPath
    const cloudinaryPath = await Promise.all(
      localPath.map((local) => uploadOnCloudinary(local))
    );

    // check if files are uploaded to cloudinary or not
    if (!cloudinaryPath)
      return errorResponse(res, 400, "Failed to upload image to cloudinary");

    const secure_urls = cloudinaryPath.map((item, index) => item.secure_url);

    // if no, then create a new product with images and save it to the db
    const product = await Product.create({
      productName,
      productDescription,
      productCategory,
      productSubCategory,
      productPrice,
      productDiscountedPrice,
      stockQuantity,
      availableSizes,
      availableColors,
      isFeatured,
      isNewCollection,
      images: secure_urls,
    });

    // everything is fine till here
    return successResponse(res, "Product Added Successfully...", product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export default postNewProduct;
