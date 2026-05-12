import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-950">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-gray-700 text-8xl">404</h1>
        <p className="mb-8 text-lg text-gray-400">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 font-semibold text-white transition-all bg-blue-600 hover:bg-blue-500 rounded-xl"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
