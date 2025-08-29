const BookAllData = require("../Modules/Books.data");

const GateAllBook = async (req, res) => {
  try {
    const books = await BookAllData.find();

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
      });
    }

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GateAllBook };
