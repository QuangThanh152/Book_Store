const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json( { message: 'Quyền truy cập bị từ chối, Không có mã thông báo nào được cung cấp' } )
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json( { message: 'Quyền truy cập bị từ chối, Mã thông báo không hợp lệ' } )
        }

        if (user.role !== 'admin') {
            return res.status(403).json( { message: 'Quyền truy cập bị từ chối, Bạn không phải là Admin' } )
        }

        req.user = user
        next();
    })
}

module.exports = verifyAdminToken;