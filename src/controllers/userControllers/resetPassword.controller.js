import { User } from "../../models/user.model.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const resetPassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const token = req.query.token;
    try {
        if (!newPassword)
            return errorResponse(res, 400, "Please enter new password");

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        } catch (err) {
            return errorResponse(res, 401, "Invalid or expired reset token");
        }

        const userEmail = decoded.email;

        const isUser = await User.findOne({ email: userEmail });
        if (!isUser)
            return errorResponse(res, 404, "User not found");

        // const encryptedPassword = await bcrypt.hash(newPassword, 10); no need to hash it here it will hash it when we save it because I am already using a pre save hook in user model
        isUser.password = newPassword;

        await isUser.save({ validateBeforeSave: false });

        successResponse(res, "Password reset successfully");
    } catch (error) {
        console.log("error", error);
        return errorResponse(res, "Error reseting the password");
    }
}