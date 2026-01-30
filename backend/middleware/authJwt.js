import jwt from "jsonwebtoken";
import { getUserById } from "../db/users.js";
import { JWT_SECRET } from "../routes/auth.js";

/**
 * Optional JWT auth:
 * - If Authorization header present and valid, attaches req.user
 * - Otherwise req.user stays undefined
 */
export function optionalAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) return next();

    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload?.userId || payload?.sub;
    if (!userId) return next();

    const user = getUserById(userId);
    if (user) req.user = user;
    return next();
  } catch (_e) {
    return next();
  }
}

export function requireAuth(req, res, next) {
  optionalAuth(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  });
}

