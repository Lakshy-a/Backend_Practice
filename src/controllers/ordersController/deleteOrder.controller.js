import { errorResponse, successResponse} from "../../utils/apiResponse.utils.js"

const deleteOrder = (req, res) => {
    try {
        successResponse(res, "Order deleted successfully");
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Internal Server Error")
    }
}

export default deleteOrder;