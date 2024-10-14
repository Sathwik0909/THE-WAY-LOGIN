const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcrypt")
const setAuthCookie = require("../utils/generateCookie")



const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save(); // Save the user to the database

    // Generate the token
    const token = generateToken(user.email, user._id);

    // Set the token as a cookie
    setAuthCookie(res, token);

    // Redirect to the /home page after successful signup
    res.redirect('/home');
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

     // Generate the token
     const token = generateToken(user.email, user._id);

     // Set the token as a cookie
     setAuthCookie(res, token);

    // Redirect to the /home page after successful login
    res.redirect('/home');
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// controllers/logout.controller.js
const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true });
  
  // Redirect the user to the login page
  res.redirect("/login");
};


module.exports = {signup, login, logout}