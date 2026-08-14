const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register User Logic
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already exists" });

        // Hash (Encrypt) the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and Save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        // Generate JWT Token so user is automatically logged in upon registration
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.status(201).json({ 
            message: "User registered successfully!",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        });
    };
};

// Login User Logic
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // Compare the types password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ messgae: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.status(200).json({
            message: "Login Succesfull",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Users (Admin Only)
exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied. Admin only." });
        }
        
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied. Admin only." });
        }
        
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

