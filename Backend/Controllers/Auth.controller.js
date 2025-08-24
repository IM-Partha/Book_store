const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth_Data = require("../Modules/User.data");
require('dotenv').config();

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await Auth_Data.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await Auth_Data.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth_Data.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
};

module.exports = { Register, Login };
