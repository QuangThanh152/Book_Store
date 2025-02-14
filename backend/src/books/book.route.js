const express = require('express')
const Book = require('./book.model.js');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteBook } = require('./book.controller.js');
const verifyAdminToken = require('../middleware/verifyAdminToken.js');
const router = express.Router();

// frontend  => backend server => controller => book schema => database => send to server => back to the frontend
// "post" khi gửi 1 cái gì đó lên db
// "get" khi lấy 1 cái gì đó từ db
// "put/patch" khi cập nhật cái gì đó lên db
// "delete" khi xóa thứ gì đó 

// Thêm 1 Sách
router.post("/create-book", verifyAdminToken ,postABook);

// lấy tất cả sách
router.get("/", getAllBooks);

// lấy 1 cả sách
router.get("/:id", getSingleBook);

// Cập nhật lại sách
router.put("/edit/:id",verifyAdminToken , UpdateBook)

// xóa lại sách
router.delete("/:id", verifyAdminToken ,deleteBook);

module.exports = router;