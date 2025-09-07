import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { email, password, userType, firstName, lastName, institution } = req.body;

    if (!email || !password || !userType || !firstName || !lastName || !institution) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    if (!["teacher", "student"].includes(userType)) {
      return res.status(400).json({
        success: false,
        message: "User type must be either 'teacher' or 'student'"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      userType,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      institution: institution.trim(),
    });

    await user.save();

    const token = generateToken(user._id);

    const userResponse = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      institution: user.institution,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during signup"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    const userResponse = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      institution: user.institution,
      lastLogin: user.lastLogin,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login"
    });
  }
};
