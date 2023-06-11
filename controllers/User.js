
const bcrypt = require('bcrypt')
const User = require('../models/User')
const register = async (req, res) => {
  const {name, email, password}= req.body;
  try {
    // Check if all fields are provided
    if (!name || !password || !email) {
      return res.status(400).json({ message: "All fields are compulsory" });
    }

    // Create a new user
    const saltRounds = 10; // Number of salt rounds
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    // Return the user object
    res.status(200).json({
      message: "User successfully registered",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if passwords match
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Passwords match, user is authenticated
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: "Failed to log in", error: error.message });
  }
};

module.exports = {
  login,
  register,
}
