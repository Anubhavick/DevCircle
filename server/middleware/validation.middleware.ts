import { body, param, query } from "express-validator";

export const validateCreateRequest = [
  body("type")
    .isIn(["code_review", "bug_fix", "github_star", "collaboration", "mentorship", "other"])
    .withMessage("Invalid request type"),
  body("title")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),
  body("description")
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),
  body("helpCredits")
    .isInt({ min: 1, max: 10 })
    .withMessage("Help credits must be between 1 and 10"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  body("repoUrl")
    .optional()
    .isURL()
    .withMessage("Repository URL must be valid"),
];

export const validateUpdateUser = [
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio must not exceed 500 characters"),
  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array"),
];

export const validateUserId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID format"),
];

export const validateRequestId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid request ID format"),
];
