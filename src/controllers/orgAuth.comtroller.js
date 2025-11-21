const Org = require("../models/Org");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (org) => {
  return jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (org) => {
  return jwt.sign({ id: org._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// Register
exports.registerOrg = async (req, res) => {
  try {
    const { orgName, orgPhone, orgEmail, orgPassword, type } = req.body;
    const existingOrg = await Org.findOne({ orgEmail });

    if (existingOrg)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(orgPassword, 10);

    const newOrg = await Org.create({
      orgName,
      orgPhone,
      orgEmail,
      orgPassword: hashedPassword,
      type,
    });

    res.status(201).json({ message: "Organization registered successfully", org: newOrg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.loginOrg = async (req, res) => {
  try {
    const { orgEmail, orgPassword } = req.body;
    const org = await Org.findOne({ orgEmail });

    if (!org) return res.status(404).json({ message: "Org not found" });

    const isMatch = await bcrypt.compare(orgPassword, org.orgPassword);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    org.lastLogin = new Date();
    await org.save();

    const accessToken = generateAccessToken(org);
    const refreshToken = generateRefreshToken(org);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true for production https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", accessToken, org });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh
exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const org = await Org.findById(decoded.id);
    const newAccessToken = generateAccessToken(org);

    res.json({ accessToken: newAccessToken });
  });
};

// Logout
exports.logoutOrg = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
