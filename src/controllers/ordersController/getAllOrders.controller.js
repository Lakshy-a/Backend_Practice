import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js";

const getAllOrders = (req, res) => {
    try {
        successResponse(res, "All orders fetched successfully");
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, error.message)
    }
}

export default getAllOrders;