const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth_Data = require("../Modules/User.data");
require('dotenv').config();

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await Auth_Data.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth_Data({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error during registration", error: error.message });
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
