const express = require('express')
const User = require('./user.model')
const jwt = require('jsonwebtoken')

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post('/admin', async (req, res) => {
    const {username, password} = req.body;
    try {
          // Kiểm tra tài khoản
        const admin = await User.findOne({username})
        if (!admin) {
            return res.status(404).json({ message: "Tài khoản không tồn tại." });
        }

         // Kiểm tra mật khẩu
         if (admin.password !== password) {
            return res.status(401).json({ message: "Mật khẩu không chính xác." });
        }

         // Tạo token
        const token = jwt.sign({
            id: admin._id, 
            username: admin.username, 
            role: admin.role
        },
        JWT_SECRET, {expiresIn: "3h"} // Token hết hạn sau 1 giờ
    )

     // Trả phản hồi thành công
    return res.status(200).json({
        message: "Đăng nhập thành công.",
        token: token,
        user: {
            username: admin.username,
            role: admin.role
        }
    })
    } catch (error) {
        console.log("Lỗi khi đăng nhập trang admin", error)
        return res.status(500).json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
    }
})

module.exports = router;