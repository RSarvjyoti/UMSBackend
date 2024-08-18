import Event from '../models/Event.mjs';
import User from '../models/User.mjs';
import { config } from 'dotenv';
config();

export const createEvent = async (req, res) => {
  const { title, description, date, capacity, price } = req.body;

  const event = new Event({
    title,
    description,
    date,
    capacity,
    price,
    createdBy: req.user._id,
  });

  await event.save();

  res.status(201).json(event);
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate('attendees', 'name');
  res.json(events);
};

export const registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.attendees.includes(req.user._id)) {
    return res.status(400).json({ message: 'Already registered for this event' });
  }

  if (event.capacity <= event.attendees.length) {
    return res.status(400).json({ message: 'Event is sold out' });
  }

  event.attendees.push(req.user._id);
  await event.save();

  const user = await User.findById(req.user._id);
  user.registeredEvents.push(event._id);
  await user.save();

  res.json(event);
};

export const cancelEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.attendees.length > 0) {
    return res.status(400).json({ message: 'Cannot cancel an event with attendees' });
  }

  const daysDiff = (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24);

  if (daysDiff < process.env.CANCELLATION_THRESHOLD) {
    return res.status(400).json({ message: `Cannot cancel within ${process.env.CANCELLATION_THRESHOLD} days of the event` });
  }

  await event.remove();

  res.json({ message: 'Event canceled' });
};

export const getEventDetails = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('attendees', 'name');

  if (!event) return res.status(404).json({ message: 'Event not found' });

  res.json(event);
};
