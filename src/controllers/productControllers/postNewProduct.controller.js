import { Product } from "../../models/product.model.js";
import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";


const postNewProduct = async (req, res) => {
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

    const doProductExist = await Product.findOne({ productName });
    if (doProductExist) {
      return errorResponse(res, 400, "Product already exist");
    }

    const productImages = req.files;
    const localPath = productImages.map((file) => file.path);

    if (!localPath) return errorResponse(res, 400, "No image uploaded");

    const cloudinaryPath = await Promise.all(
      localPath.map((local) => uploadOnCloudinary(local)),
    );

    if (!cloudinaryPath)
      return errorResponse(res, 400, "Failed to upload image to cloudinary");

    const secure_urls = cloudinaryPath.map((item, index) => item.secure_url);

    const product = await Product.create({
      productName,
      productDescription,
      productCategory,
      productSubCategory,
      productPrice,
      productDiscountedPrice,
      stockQuantity,
      availableSizes: JSON.parse(req.body.availableSizes),
      availableColors: JSON.parse(req.body.availableColors),
      isFeatured,
      isNewCollection,
      images: secure_urls,
    });

    return successResponse(res, "Product Added Successfully...", product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export default postNewProduct;
