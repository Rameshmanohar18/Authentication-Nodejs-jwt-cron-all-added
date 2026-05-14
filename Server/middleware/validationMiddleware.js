import { body, param, validationResult } from "express-validator";

export const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const loginRules = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

export const changePasswordRules = [
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const roleRules = [
  body("id").isMongoId().withMessage("Valid user id is required"),
  body("role").isIn(["user", "admin"]).withMessage("Role must be user or admin")
];

export const userIdBodyRules = [
  body("id").isMongoId().withMessage("Valid user id is required")
];

export const mongoIdParam = (name = "id") => [
  param(name).isMongoId().withMessage(`Valid ${name} is required`)
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
};
