import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.mjs';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);

export default authRoutes;
