import jwt from "jsonwebtoken";

const access = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

const refresh = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

export default { access, refresh };
