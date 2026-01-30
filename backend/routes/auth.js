import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, createUserWithPassword, getUserByEmail } from "../db/users.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const SALT_ROUNDS = 10;

const isValidEmail = (email) =>
  typeof email === "string" &&
  email.includes("@") &&
  email.includes(".") &&
  email.length >= 5;

const isValidPassword = (p) =>
  typeof p === "string" && p.length >= 8;

/**
 * POST /api/auth/signup
 * Body: { email, password }
 * Creates account with hashed password.
 */
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Valid email required" });
    }
    if (!password || !isValidPassword(password)) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = getUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(400).json({ success: false, error: "An account with this email already exists. Log in instead." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = createUserWithPassword(normalizedEmail, passwordHash);
    const user = getUserByEmail(normalizedEmail);

    const token = jwt.sign({ userId: user.id, email: normalizedEmail }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, email: normalizedEmail, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Verifies password and returns JWT.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Valid email required" });
    }
    if (!password || typeof password !== "string") {
      return res.status(400).json({ success: false, error: "Password required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = getUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    // User without password_hash = old account created before signup (e.g. checkout only)
    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        error: "No password set for this email. Use Sign up to create an account with a password, or use the checkout flow.",
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: normalizedEmail }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, email: normalizedEmail, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/auth/logout
 * Frontend clears token; this is for consistency.
 */
router.post("/logout", (_req, res) => {
  res.json({ success: true });
});

export default router;
export { JWT_SECRET };
