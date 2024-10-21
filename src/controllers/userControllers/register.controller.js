import bcrypt from "bcryptjs";
import errorHandler from "../../utils/errorHandler.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";

const registerController = async (req, res) => {
  const { userName, email, password, fullName } = req.body;

  try {
    // All fields are required
    if (!userName || !email || !password) {
      return errorHandler(res, 400, "All fields are required...");
    }

    // Email format validation
    if (!email.includes("@") || !email.includes(".com")) {
      return errorHandler(res, 400, "Please check the format of email");
    }

    // Password format validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return errorHandler(
        res,
        400,
        "Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
    }

    // check if user with the same userName or same email exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    // if user already exists throw error
    if (existingUser) {
      return errorHandler(res, 400, "User already exists");
    }

    // Access the uploaded avatar
    const avatarLocalPath = req.file?.path;
    // console.log("Details of the uploaded file: ", req.file);

    // avatar is required
    if (!avatarLocalPath) {
      return errorHandler(res, 400, "Avatar is required");
    }

    // response we'll get after uploading our local path to the cloudinary
    const avatarResponse = await uploadOnCloudinary(avatarLocalPath);

    // if there is no response it means that there is some error in uploading the local path to cloudinary
    if (!avatarResponse) {
      return errorHandler(res, 400, "Error uploading avatar to Cloudinary...");
    }

    // Save user to the database
    const user = await User.create({
      userName,
      email,
      password, // password has already been hashed in the userSchema
      fullName,
      avatar: avatarResponse.secure_url, // Use the URL returned from Cloudinary
    });

    // Exclude sensitive fields from the response
    // in the response password and refresh token will not be sent
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // no user found
    if (!createdUser) {
      return errorHandler(res, 400, "User not found");
    }

    // everything is running fine
    res
      .status(200)
      .json({ message: "User registered successfully", user: createdUser });
  } catch (error) {
    console.error(error);
    errorHandler(res, 400, "Error registering user...");
  }
};

export default registerController;
