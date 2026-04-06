const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.residentSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user with hashed password
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'resident'
    });
    await user.save();

    res.status(201).json({ message: 'Resident signup successful!' });
  } catch (err) {
    console.error('residentSignup error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed,
      role: 'resident',
    });

    const token = signToken(user);

    return res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token,
      },
    });
  } catch (err) {
    console.error('register error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token,
      },
    });
  } catch (err) {
    console.error('login error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('getMe error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, location, phone } = req.body;
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (phone !== undefined) updateData.phone = phone.trim();

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('updateProfile error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

