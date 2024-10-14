const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token; // Assuming you're using cookies to store the token

  // If token is not found, user is not authenticated
  if (!token) {
    return next(); // Allow access to the signup/login pages
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    return res.redirect('/home'); // Redirect authenticated users to home
  } catch (err) {
    return next(); // If token is invalid, allow access to the signup/login pages
  }
};

module.exports = isAuthenticated;
