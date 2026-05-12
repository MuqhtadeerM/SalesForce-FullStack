export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  loading = false,
  className = "",
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    success: "bg-green-700 hover:bg-green-600 text-white",
    danger: "bg-red-700 hover:bg-red-600 text-white",
    purple: "bg-purple-700 hover:bg-purple-600 text-white",
    ghost: "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
          ${variants[variant]}
          disabled:opacity-50 disabled:cursor-not-allowed
          font-semibold px-5 py-2.5 rounded-xl
          transition-all duration-200 text-sm
          flex items-center gap-2
          ${className}
        `}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
      )}
      {children}
    </button>
  );
}
