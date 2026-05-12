import { useState } from "react";
import {
  getValidationRules,
  toggleSingleRule,
  toggleAllRules,
  deployChanges,
} from "../services/api";

export const useValidationRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [togglingAll, setTogglingAll] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  const handleGetRules = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getValidationRules();
      setRules(res.data.data);
      setFetched(true);
      showMessage(`Fetched ${res.data.data.length} validation rules`);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to fetch rules. Make sure you are logged in.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSingle = async (id, currentActive) => {
    setTogglingId(id);
    try {
      await toggleSingleRule(id, !currentActive);
      setRules((prev) =>
        prev.map((r) => (r.Id === id ? { ...r, Active: !currentActive } : r)),
      );
      showMessage(
        `Rule ${!currentActive ? "enabled" : "disabled"} successfully`,
      );
    } catch (err) {
      showError(err.response?.data?.message || "Failed to toggle rule");
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleAll = async (active) => {
    setTogglingAll(true);
    try {
      await toggleAllRules(active);
      setRules((prev) => prev.map((r) => ({ ...r, Active: active })));
      showMessage(`All rules ${active ? "enabled" : "disabled"} successfully`);
    } catch (err) {
      showError(err.response?.data?.message || "Failed to toggle all rules");
    } finally {
      setTogglingAll(false);
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      await deployChanges();
      showMessage("Changes deployed to Salesforce successfully");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to deploy changes");
    } finally {
      setDeploying(false);
    }
  };

  return {
    rules,
    loading,
    togglingId,
    togglingAll,
    deploying,
    fetched,
    message,
    error,
    handleGetRules,
    handleToggleSingle,
    handleToggleAll,
    handleDeploy,
  };
};
