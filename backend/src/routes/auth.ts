import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validateRegister, validateLogin } from '../middleware/validate';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
