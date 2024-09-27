import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token); // Tambahkan log ini

    if (!token) {
        console.log('Access denied, no token found'); // Log jika tidak ada token
        return res.status(401).json({ message: 'Access denied, please login' });
    }

    try {
        const verified = jwt.verify(token, 'secretkey');
        req.userId = verified.userId;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Log error
        res.status(400).json({ message: 'Invalid token' });
    }
};
