const Book = require("./book.model");

//  Thêm 1 sách
const postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Sách được đăng thành công!", book: newBook})
    } catch (error) {
        console.log("Lỗi khi tạo sách", error);
        res.status(500).send({message: "Lỗi khi tạo sách"})
    }
}

// Lấy tất cả sách
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send({message: "Tất cả sách được lấy thành công!", books})
    } catch (error) {
        console.log("Lỗi khi kết nối sách", error);
        res.status(500).send({message: "Lỗi khi lấy tất sách"})
    }
}
// Lấy 1 cả sách
const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if (!book) {
        res.status(404).send({message: "Không tìm thấy sách!"})
            
        }
        res.status(200).send(book)
    } catch (error) {
        console.log("Lỗi khi kết nối 1 sách", error);
        res.status(500).send({message: "Lỗi khi lấy 1 sách"})
    }
}

module.exports = {
    postABook, getAllBooks, getSingleBook
}