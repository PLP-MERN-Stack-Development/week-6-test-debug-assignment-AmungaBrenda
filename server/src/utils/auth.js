const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1d' }
  );
};

module.exports = { generateToken };
