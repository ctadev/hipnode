import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Salt 10 rounds
const saltRouds = 10;

// Hash Password
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRouds);
};

// Compare password with hash password
export const comparePassword = async (
  password: string,
  userPassword: string
) => {
  return bcrypt.compare(password, userPassword);
};

// Generate JWT token
export const generateToken = async (id: number) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "24h",
  });
};

// Verify JWT token
export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};
