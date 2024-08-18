import User from '../models/User.mjs';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG and PNG are allowed.'));
    }
  },
}).array('profilePictures', 5);

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

export const getAlluser = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' }); 
  }
};

export const updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const user = await User.findById(req.user.id);

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.files) user.profilePictures.push(...req.files.map(file => file.path));

    await user.save();

    res.json(user);
  });
};

export const deleteProfile = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);

    // Ensure the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete profile pictures
    user.profilePictures.forEach(file => {
      fs.unlinkSync(file);
    });

    // Delete the user
    await User.deleteOne({ _id: req.user.id });

    // Send success response
    res.json({ message: 'User profile removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};