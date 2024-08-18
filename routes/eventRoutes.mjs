import express from 'express';
import { createEvent, getEvents, registerForEvent, cancelEvent, getEventDetails } from '../controllers/eventController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const eventRoutes = express.Router();

eventRoutes.post('/create', protect, createEvent);
eventRoutes.get('/', getEvents);
eventRoutes.post('/register/:id', protect, registerForEvent);
eventRoutes.delete('/cancel/:id', protect, cancelEvent);
eventRoutes.get('/:id', getEventDetails);

export default eventRoutes;
