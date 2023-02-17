const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.create = async (req, res, next) => {
  try {
    const { mobileNumber, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ mobileNumber, username, email, hashedPassword });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password , mobileNumber } = req.body;
  const user = await User.findOne({ email , mobileNumber });

  if (!user || !user.checkPassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user._id;
  res.json({ message: 'Logged in successfully' });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
};
