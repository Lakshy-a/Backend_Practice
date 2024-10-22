import bcrypt from "bcryptjs";
import errorHandler from "../../utils/errorHandler.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";

const registerController = async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body)

  try {
    // All fields are required
    if (!name || !email || !password || !phone) {
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
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });

    // if user already exists throw error
    if (existingUser) {
      return errorHandler(res, 400, "User already exists");
    }

    // Save user to the database
    const user = await User.create({
      name,
      email,
      password, // password has already been hashed in the 
      phone,
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
