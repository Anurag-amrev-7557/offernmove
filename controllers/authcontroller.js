const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../models/otp-model.js");
require("dotenv").config();

const createErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message, success: false });
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&#]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};


const signup = async (req, res) => {
    try {
        const { phone, email, password, otp } = req.body;

        // Input validation
        if (!phone || !email || !password || !otp ) {
            return createErrorResponse(res, 400, "Phone, Email, Password, and OTP are required.");
            
        }

        if (!isValidEmail(email)) {
            return createErrorResponse(res, 400, "Invalid email format.");
        }

        if (!isStrongPassword(password)) {
            return createErrorResponse(res, 400, "Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.");
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return createErrorResponse(res, 409, "User already exists, you can login.");
        }

        // Hash the password
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const newOTP = new Otp({
            email: email,
            otp: hashedOTP,
        })
        await newOTP.save();

        // Create and save new user
        const userModel = new User({
            phone,
            email,
            otp,
            password: hashedPassword,
        });
        await userModel.save();

        res.status(201).json({
            message: "Signup successful.",
            success: true,
            user: userModel,
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        return createErrorResponse(res, 500, "Internal Server Error.");
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return createErrorResponse(res, 400, "Email and password are required.");
        }

        if (!isValidEmail(email)) {
            return createErrorResponse(res, 400, "Invalid email format.");
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return createErrorResponse(res, 401, "Authentication failed: Invalid credentials.");
        }

        // Compare the provided password with the hashed password
        const isPassEqual = await bcrypt.compare(password, existingUser.password);
        if (!isPassEqual) {
            return createErrorResponse(res, 401, "Authentication failed: Invalid credentials.");
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: existingUser.email, _id: existingUser._id, phone: existingUser.phone },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || "24h" }
        );

        res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: existingUser.email,
            phone: existingUser.phone,
        });
    } catch (err) {
        console.error("Login error:", err.message); 
        return createErrorResponse(res, 500, "Internal Server Error.");
    }
};


module.exports = { signup, login };
