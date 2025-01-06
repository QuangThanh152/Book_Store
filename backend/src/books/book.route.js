const express = require('express')
const Book = require('./book.model.js');
const { postABook, getAllBooks, getSingleBook } = require('./book.controller.js');
const router = express.Router();

// frontend  => backend server => controller => book schema => database => send to server => back to the frontend
// "post" khi gửi 1 cái gì đó lên db
// "get" khi lấy 1 cái gì đó từ db
// "put/patch" khi cập nhật cái gì đó từ db
// "delete" khi xóa thứ gì đó 

// Thêm 1 Sách
router.post("/create-book", postABook);

// lấy tất cả sách
router.get("/", getAllBooks);

// lấy 1 cả sách
router.get("/:id", getSingleBook);

module.exports = router;