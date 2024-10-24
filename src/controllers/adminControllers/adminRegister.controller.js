import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { Admin } from "../../models/admin.model.js";

const adminRegister = async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;
  try {
    if (!adminName || !adminEmail || !adminPassword)
      return errorResponse(res, 400, "All the fields are required");

    const admin = await Admin.findOne({ adminEmail });
    if (admin) return errorResponse(res, 400, "Admin already exists");

    await Admin.create({
      adminName,
      adminEmail,
      adminPassword,
    });

    successResponse(res, "Admin Registered Successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error registering admin...");
  }
};

export default adminRegister;
