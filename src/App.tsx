import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Auth/guards/PrivateRoute";
import PublicRoute from "./Auth/guards/PublicRoute";
import LoginPage from "./Auth/pages/LoginPage";
import AuthProvider from "./Auth/providers/AuthProvider";
import EvaluationPage from "./Evaluation/pages/EvaluationPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/auth">
                <Navigate to="/evaluation" />
              </PrivateRoute>
            }
          />
          <Route
            path="auth"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="evaluation"
            element={
              <PrivateRoute redirectTo="/auth">
                <EvaluationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute redirectTo="/auth">
                <Navigate to="/evaluation" />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
