import bcrypt from "bcryptjs";
import errorHandler from "../../utils/errorHandler.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";

const registerController = async (req, res) => {
  const { name, email, password, phone } = req.body;
  // console.log(req.body);

  try {
    // All fields are required
    if (!name || !email || !password || !phone) {
      return errorHandler(res, 400, "All fields are required.");
    }

    // Email format validation
    if (!email.includes("@") || !email.includes(".com")) {
      return errorHandler(res, 400, "Please check the format of the email.");
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

    // Check if user with the same name or email exists
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return errorHandler(
        res,
        400,
        "User with this email or username already exists."
      );
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Exclude sensitive fields from the response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return errorHandler(res, 400, "User not found.");
    }

    // Return success response
    res.status(200).json({
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (error) {
    console.error(error);

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return errorHandler(res, 400, `Duplicate ${field} detected.`);
    }

    // Handle other errors
    errorHandler(res, 500, "Error registering user.");
  }
};

export default registerController;
