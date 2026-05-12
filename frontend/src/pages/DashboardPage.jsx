import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "true") {
      localStorage.setItem("sf_authenticated", "true");
      navigate("/dashboard", { replace: true });
    } else {
      const isAuth = localStorage.getItem("sf_authenticated");
      if (!isAuth) {
        navigate("/", { replace: true });
      }
    }
  }, []);

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
    <div className="min-h-screen text-white bg-gray-950">
      {/* Header */}
      <header className="px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
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
            className="px-3 py-2 text-xs text-gray-400 transition-all border border-gray-700 rounded-lg hover:text-white hover:border-gray-500"
          >
            Re-authenticate
          </button>
        </div>
      </header>

      <main className="max-w-6xl px-6 py-8 mx-auto">
        {/* Notifications */}
        {message && (
          <div className="px-4 py-3 mb-4 text-sm text-green-300 bg-green-900 border border-green-700 rounded-xl">
            ✓ {message}
          </div>
        )}
        {error && (
          <div className="px-4 py-3 mb-4 text-sm text-red-300 bg-red-900 border border-red-700 rounded-xl">
            ✗ {error}
          </div>
        )}

        {/* Stats Cards */}
        {fetched && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <p className="mb-1 text-xs text-gray-400">Total Rules</p>
              <p className="text-3xl font-bold text-white">{rules.length}</p>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <p className="mb-1 text-xs text-gray-400">Active</p>
              <p className="text-3xl font-bold text-green-400">{activeCount}</p>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <p className="mb-1 text-xs text-gray-400">Inactive</p>
              <p className="text-3xl font-bold text-red-400">{inactiveCount}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleGetRules}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
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

          <button
            onClick={() => handleToggleAll(true)}
            disabled={togglingAll || !fetched}
            className="px-5 py-2.5 text-sm font-semibold text-white transition-all bg-green-700 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {togglingAll ? "Working..." : "Enable All"}
          </button>

          <button
            onClick={() => handleToggleAll(false)}
            disabled={togglingAll || !fetched}
            className="px-5 py-2.5 text-sm font-semibold text-white transition-all bg-red-700 rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {togglingAll ? "Working..." : "Disable All"}
          </button>

          <button
            onClick={handleDeploy}
            disabled={deploying || !fetched}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-purple-700 rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deploying ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
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
          <div className="p-16 text-center bg-gray-900 border border-gray-800 rounded-2xl">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            <p className="text-sm text-gray-500">
              Click "Get Validation Rules" to load rules from Salesforce
            </p>
          </div>
        ) : (
          <div className="overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
                    #
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
                    Rule Name
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-left text-gray-400">
                    Rule ID
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-right text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, index) => (
                  <tr
                    key={rule.Id}
                    className="transition-colors border-b border-gray-800 last:border-0 hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">
                        {rule.ValidationName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${rule.Active ? "bg-green-900 text-green-300 border border-green-800" : "bg-red-900 text-red-300 border border-red-800"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${rule.Active ? "bg-green-400" : "bg-red-400"}`}
                        />
                        {rule.Active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {rule.Id}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleSingle(rule.Id, rule.Active)}
                        disabled={togglingId === rule.Id}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${rule.Active ? "bg-red-900 hover:bg-red-800 text-red-300 border border-red-800" : "bg-green-900 hover:bg-green-800 text-green-300 border border-green-800"}`}
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
