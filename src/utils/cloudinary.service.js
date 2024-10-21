import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dzhvt6wv0",
  api_key: "969128248253686",
  api_secret: "fr10DN9Zi-35oN-lPWPYNf8lHMY",
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  // console.log(localFilePath);
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File uploaded successfully", response.url);

    // iof the file has been uploaded successfully remove it from the local 
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Attempt to delete the local file if upload fails
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("Temporary file deleted successfully.");
      }
    });

    return null;
  }
};

export { uploadOnCloudinary };
