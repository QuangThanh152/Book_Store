const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

// Port
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Routes
const bookRoutes = require("./src/books/book.route");
app.use("/api/books", bookRoutes);

// Fallback route
app.use("/", (req, res) => {
  res.send("Server web bookStore running");
});

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Đã xảy ra lỗi trên server", error: err.message });
});

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Kết nối đến MongoDB thành công");
  } catch (err) {
    console.error("Kết nối đến MongoDB thất bại:", err.message);
    process.exit(1); // Dừng server nếu không thể kết nối
  }
};

// Khởi động server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });
};
startServer();
