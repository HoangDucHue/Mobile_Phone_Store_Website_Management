const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        // Lấy token từ header Authorization. Định dạng là "Bearer <token>"
        const token = req.headers.authorization.split(' ')[1]; 

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            return res.status(401).send({ message: 'Access denied. No token provided.' });
        }

        // Xác minh token và lấy thông tin người dùng từ token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
