import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js";

const adminLogout = (req, res) => {
    try {
        successResponse(res, "Admin Logout Successful");
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error logout admin...");
    }
}

export default adminLogout;