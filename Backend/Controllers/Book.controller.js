const BookAllData = require("../Modules/Books.data");

const GateAllBook = async (req, res) => {
    try {
        const NewBooks = await BookAllData.find();
        
        if (NewBooks.length > 0) {
            res.status(200).json({
                success: true,
                Data: NewBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No Data Found"
            });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: `Something went wrong: ${error.message}`  // More specific error message
        });
    }
};

module.exports = {
    GateAllBook
};
