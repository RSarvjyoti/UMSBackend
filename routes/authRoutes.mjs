import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.mjs';

const authRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password chosen by the user
 *         profilePictures:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of URLs pointing to the user's profile pictures
 *         registeredEvents:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: An array of event IDs that the user is registered for
 *       example:
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         password: "Password123!"
 *         profilePictures:
 *           - "https://example.com/profile1.jpg"
 *           - "https://example.com/profile2.jpg"
 *         registeredEvents:
 *           - "60b77c78f7a640001cbd7b5a"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, possibly due to validation errors or duplicate email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

authRoutes.post('/register', registerUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: "john.doe@example.com"
 *         password: "Password123!"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the result of the login attempt
 *           example: "Login successful"
 *         token:
 *           type: string
 *           description: The JWT token for authenticated requests
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The user ID
 *               example: "60b77c78f7a640001cbd7b5a"
 *             name:
 *               type: string
 *               description: The user's name
 *               example: "John Doe"
 *             email:
 *               type: string
 *               description: The user's email
 *               example: "john.doe@example.com"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad request, possibly due to invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
authRoutes.post('/login', loginUser);

export default authRoutes;
