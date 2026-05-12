import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem("sf_authenticated");
  const hasAuthParam =
    new URLSearchParams(location.search).get("auth") === "true";

  console.log("Auth check:", isAuth);
  console.log("Auth param:", hasAuthParam);

  // Allow through if either localStorage is set OR ?auth=true is in URL
  if (!isAuth && !hasAuthParam) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
