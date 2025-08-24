const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken');
const Auth_Data = require("../Modules/User.data");


const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await Auth_Data.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user
    const newUser = new Auth_Data({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 5. Response
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message, // add error for debugging (remove in prod)
    });
  }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findEmail = await Auth_Data.findOne({ email });
        if (!findEmail) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, findEmail.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const accessToken = JWT.sign({
            userId: findEmail._id,
            email: findEmail.email,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' });

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: accessToken,
        });
    } catch (error) {
        console.log(`Internal error: ${error}`);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

module.exports = {
    Signup,
    Login
};
