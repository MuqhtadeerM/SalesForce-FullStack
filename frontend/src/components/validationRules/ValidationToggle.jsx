export default function ValidationToggle({ active, loading, onToggle }) {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        active
          ? "bg-red-900 hover:bg-red-800 text-red-300 border border-red-800"
          : "bg-green-900 hover:bg-green-800 text-green-300 border border-green-800"
      }`}
    >
      {loading ? "..." : active ? "Deactivate" : "Activate"}
    </button>
  );
}
