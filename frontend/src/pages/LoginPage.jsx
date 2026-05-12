import { loginToSalesforce } from "../services/api";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Clear auth when user lands on login page
    localStorage.removeItem("sf_authenticated");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-10 text-center bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-600 rounded-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-white">
          Validation Rule Manager
        </h1>
        <p className="mb-8 text-sm text-gray-400">
          Connect to your Salesforce org to manage validation rules
        </p>

        <button
          onClick={loginToSalesforce}
          className="flex items-center justify-center w-full gap-3 px-6 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 hover:bg-blue-500 rounded-xl"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          Login with Salesforce
        </button>

        <p className="mt-6 text-xs text-gray-600">
          Uses OAuth 2.0 — your credentials are never stored
        </p>
      </div>
    </div>
  );
}
