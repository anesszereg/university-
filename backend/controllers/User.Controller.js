const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Create a new user (register)
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "User with this email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });



        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },

            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: true,
            message: "Login successful",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Export the functions
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    loginUser
};