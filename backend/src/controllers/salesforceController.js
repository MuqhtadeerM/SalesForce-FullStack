import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { MESSAGES } from "../constants/messages.js";
import {
  getLoginUrlService,
  authorizeSalesforceService,
  getConnection,
} from "../services/salesforceService.js";
import { env } from "../config/env.js";

export const loginToSalesforce = asyncHandler(async (req, res) => {
  const loginUrl = getLoginUrlService();
  console.log(loginUrl);
  res.redirect(loginUrl);
});

export const oauthCallback = asyncHandler(async (req, res) => {
  console.log("=== CALLBACK HIT ===");
  console.log("Query params:", req.query);

  const { code, error, error_description } = req.query;

  if (error) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          false,
          `Salesforce error: ${error} - ${error_description}`,
        ),
      );
  }

  if (!code) {
    return res
      .status(400)
      .json(new ApiResponse(false, "Authorization code missing"));
  }

  await authorizeSalesforceService(code);

  // Pass auth=true so frontend knows login succeeded
  res.redirect(`${env.CLIENT_URL}/dashboard?auth=true`);
});

export const getValidationRules = asyncHandler(async (req, res) => {
  const conn = getConnection();

  console.log("=== FETCHING RULES ===");

  const result = await conn.tooling.query(
    "SELECT Id, ValidationName, Active FROM ValidationRule",
  );

  console.log("Rules found:", result.records.length);

  res
    .status(200)
    .json(new ApiResponse(true, MESSAGES.FETCH_RULES_SUCCESS, result.records));
});

export const toggleSingleRule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  const conn = getConnection();

  console.log("=== TOGGLE SINGLE RULE ===");
  console.log("ID:", id, "Active:", active);

  // Retrieve full rule metadata individually
  const rule = await conn.tooling.retrieve("ValidationRule", id);

  console.log("Rule metadata fetched:", rule.ValidationName);

  // Update with full metadata preserved
  await conn.tooling.update("ValidationRule", {
    Id: id,
    Metadata: {
      ...rule.Metadata,
      active: active,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(true, "Rule updated successfully", { id, active }));
});

export const toggleAllRules = asyncHandler(async (req, res) => {
  const { active } = req.body;
  const conn = getConnection();

  console.log("=== TOGGLE ALL RULES ===");
  console.log("Setting all rules to active:", active);

  // Step 1 - get all IDs without metadata
  const result = await conn.tooling.query(
    "SELECT Id, ValidationName FROM ValidationRule",
  );

  console.log("Total rules:", result.records.length);

  // Step 2 - retrieve and update each rule one by one
  for (const record of result.records) {
    const rule = await conn.tooling.retrieve("ValidationRule", record.Id);
    await conn.tooling.update("ValidationRule", {
      Id: record.Id,
      Metadata: {
        ...rule.Metadata,
        active: active,
      },
    });
    console.log(`Updated: ${record.ValidationName} → active: ${active}`);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        `All rules ${active ? "enabled" : "disabled"}`,
        null,
      ),
    );
});

export const deployChanges = asyncHandler(async (req, res) => {
  const conn = getConnection();

  const result = await conn.tooling.query(
    "SELECT Id, ValidationName, Active FROM ValidationRule",
  );

  res
    .status(200)
    .json(new ApiResponse(true, MESSAGES.DEPLOY_SUCCESS, result.records));
});
