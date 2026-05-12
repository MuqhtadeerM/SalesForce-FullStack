import { loginToSalesforce } from "../../services/api";

export default function Navbar() {
  return (
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
  );
}
