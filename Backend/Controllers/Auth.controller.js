const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken');
const Auth_Data = require("../Modules/User.data");


const Signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const findByEmail = await Auth_Data.findOne({ email });
        if (findByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        // Password Hash Create 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newCreateUser = new Auth_Data({
            name,
            email,
            password: hashPassword,
        });

        await newCreateUser.save();
        return res.status(200).json({
            success: true,
            message: "Registered successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during registration",
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
