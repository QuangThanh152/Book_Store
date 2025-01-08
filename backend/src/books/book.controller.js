const Book = require("./book.model");

// Thêm một sách
const postABook = async (req, res) => {
    try {
        const newBook = new Book({ ...req.body });
        await newBook.save();
        return res.status(200).send({ 
            message: "Sách được đăng thành công!", 
            book: newBook 
        });
    } catch (error) {
        console.error("Lỗi khi tạo sách:", error.message);
        return res.status(500).send({ 
            message: "Tạo sách thất bại", 
            error: error.message 
        });
    }
};

// Lấy tất cả sách
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).send({ 
            message: "Tất cả sách được lấy thành công!", 
            books 
        });
    } catch (error) {
        console.error("Lỗi khi lấy tất cả sách:", error.message);
        return res.status(500).send({ 
            message: "Lấy tất cả sách thất bại", 
            error: error.message 
        });
    }
};

// Lấy một sách
const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID hợp lệ
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "ID sách không hợp lệ!" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Không tìm thấy sách!" });
        }

        return res.status(200).send({ 
            message: "Sách được tìm thấy!", 
            book 
        });
    } catch (error) {
        console.error("Lỗi khi lấy một sách:", error.message);
        return res.status(500).send({ 
            message: "Lấy một sách thất bại", 
            error: error.message 
        });
    }
};

// Cập nhật một sách
const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID hợp lệ
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "ID sách không hợp lệ!" });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Không tìm thấy sách để cập nhật!" });
        }

        return res.status(200).send({ 
            message: "Cập nhật sách thành công!", 
            book: updatedBook 
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error.message);
        return res.status(500).send({ 
            message: "Cập nhật sách thất bại", 
            error: error.message 
        });
    }
};

// Xóa một sách
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID hợp lệ
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "ID sách không hợp lệ!" });
        }

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Không tìm thấy sách để xóa!" });
        }

        return res.status(200).send({ 
            message: "Xóa sách thành công!", 
            book: deletedBook 
        });
    } catch (error) {
        console.error("Lỗi khi xóa sách:", error.message);
        return res.status(500).send({ 
            message: "Xóa sách thất bại", 
            error: error.message 
        });
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteBook
};
