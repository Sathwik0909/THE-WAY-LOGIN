const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Read the token from cookies

  // Check if the token is not provided
  if (!token) {
    return res.redirect('/login'); // Redirect to login if no token is found
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Attach the user info to the request object
    next(); // Move to the next middleware/route handler
  } catch (err) {
    // Redirect to login if the token is invalid
    return res.redirect('/login');
  }
};

module.exports = authenticate;
