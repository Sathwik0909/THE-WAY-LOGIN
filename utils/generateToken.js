const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId,email) => {
  // Sign the token with the user's ID and the secret key from environment variables
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Set token expiration time (1 hour in this example)
  });
};

module.exports = generateToken;
