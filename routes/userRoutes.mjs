import express from 'express';
import { getProfile, updateProfile, deleteProfile, getAlluser } from '../controllers/userController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';
import upload from '../middlewares/multerConfig.mjs';

const userRoutes = express.Router();

userRoutes.get('/', getAlluser);
userRoutes.get('/me', protect, getProfile);
userRoutes.put('/me', protect, upload.single("profileImage"), updateProfile);
userRoutes.delete('/me', protect, deleteProfile);

export default userRoutes;