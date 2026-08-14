import jwt from "jsonwebtoken";

const jwtOptions = {
  issuer: "eduaitor-api",
  audience: "eduaitor-admin",
};

export const requireAdmin = (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({ message: "Authentication is not configured" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, jwtOptions);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

export { jwtOptions };
