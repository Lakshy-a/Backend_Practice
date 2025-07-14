import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";


export const updateUserProfile = async (req, res) => {
  const {
    name, email, phone, billingAddress, shippingAddress
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return errorResponse(res, 404, "user with this email is not found");

    // Update the user fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (billingAddress) user.billingAddress = billingAddress;
    if (shippingAddress) user.shippingAddress = shippingAddress;

    await user.save();

    return successResponse(res, "User profile updated successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      billingAddress: user.billingAddress,
      shippingAddress: user.shippingAddress
    });
  } catch (error) {
    return errorResponse(res, 500, "Error in updating the user profile");
  }
};
