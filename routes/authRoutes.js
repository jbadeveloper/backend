import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You are authenticated' });
});

export default router;
