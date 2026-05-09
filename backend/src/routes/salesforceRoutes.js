import express from "express";
import {
  loginToSalesforce,
  oauthCallback,
  getValidationRules,
  toggleSingleRule,
  toggleAllRules,
  deployChanges,
} from "../controllers/salesforceController.js";

const router = express.Router();

router.get("/login", loginToSalesforce);

router.get(
  "/auth/callback",
  (req, res, next) => {
    console.log("=== RAW CALLBACK ===");
    console.log("Original URL:", req.originalUrl);
    console.log("All Query Params:", JSON.stringify(req.query));
    next();
  },
  oauthCallback,
);

router.get("/validation-rules", getValidationRules);
router.post("/toggle/:id", toggleSingleRule);
router.post("/toggle-all", toggleAllRules);
router.post("/deploy", deployChanges);

export default router;
