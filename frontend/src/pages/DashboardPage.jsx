import { useState, useEffect } from "react";
import {
  getValidationRules,
  toggleSingleRule,
  toggleAllRules,
  deployChanges,
  loginToSalesforce,
} from "../services/api";

export default function DashboardPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [togglingAll, setTogglingAll] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

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

  const activeCount = rules.filter((r) => r.Active).length;
  const inactiveCount = rules.filter((r) => !r.Active).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Validation Rule Manager
              </h1>
              <p className="text-xs text-gray-400">Salesforce Account Object</p>
            </div>
          </div>
          <button
            onClick={loginToSalesforce}
            className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-2 rounded-lg transition-all"
          >
            Re-authenticate
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Notifications */}
        {message && (
          <div className="mb-4 bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-xl text-sm">
            ✓ {message}
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-xl text-sm">
            ✗ {error}
          </div>
        )}

        {/* Stats Cards */}
        {fetched && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total Rules</p>
              <p className="text-3xl font-bold text-white">{rules.length}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Active</p>
              <p className="text-3xl font-bold text-green-400">{activeCount}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Inactive</p>
              <p className="text-3xl font-bold text-red-400">{inactiveCount}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Get Rules */}
          <button
            onClick={handleGetRules}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Fetching...
              </>
            ) : (
              "Get Validation Rules"
            )}
          </button>

          {/* Enable All */}
          <button
            onClick={() => handleToggleAll(true)}
            disabled={togglingAll || !fetched}
            className="bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            {togglingAll ? "Working..." : "Enable All"}
          </button>

          {/* Disable All */}
          <button
            onClick={() => handleToggleAll(false)}
            disabled={togglingAll || !fetched}
            className="bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            {togglingAll ? "Working..." : "Disable All"}
          </button>

          {/* Deploy */}
          <button
            onClick={handleDeploy}
            disabled={deploying || !fetched}
            className="bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2"
          >
            {deploying ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Deploying...
              </>
            ) : (
              "Deploy Changes"
            )}
          </button>
        </div>

        {/* Rules Table */}
        {!fetched ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center">
            <svg
              className="w-12 h-12 text-gray-700 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            <p className="text-gray-500 text-sm">
              Click "Get Validation Rules" to load rules from Salesforce
            </p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-400 font-medium px-6 py-4">
                    #
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium px-6 py-4">
                    Rule Name
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium px-6 py-4">
                    Rule ID
                  </th>
                  <th className="text-right text-xs text-gray-400 font-medium px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, index) => (
                  <tr
                    key={rule.Id}
                    className="border-b border-gray-800 last:border-0 hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium text-sm">
                        {rule.ValidationName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          rule.Active
                            ? "bg-green-900 text-green-300 border border-green-800"
                            : "bg-red-900 text-red-300 border border-red-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            rule.Active ? "bg-green-400" : "bg-red-400"
                          }`}
                        />
                        {rule.Active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                      {rule.Id}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleSingle(rule.Id, rule.Active)}
                        disabled={togglingId === rule.Id}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          rule.Active
                            ? "bg-red-900 hover:bg-red-800 text-red-300 border border-red-800"
                            : "bg-green-900 hover:bg-green-800 text-green-300 border border-green-800"
                        }`}
                      >
                        {togglingId === rule.Id
                          ? "..."
                          : rule.Active
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
