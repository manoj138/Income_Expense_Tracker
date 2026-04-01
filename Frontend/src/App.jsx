import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import BackendLayout from "./components/layout/BackendLayout";
import FrontendLayout from "./components/layout/FrontendLayout";

// Components
import Login from "./pages/frontend/auth/Login";
import Dashboard from "./pages/backend/Dashboard";
import Index from "./pages/frontend";
import Register from "./pages/frontend/auth/Register";
import ProfileEdit from "./pages/backend/user/ProfileEdit";
import Profile from "./pages/backend/user/Profile";
import UserIndex from "./pages/backend/user/UserIndex";
import IncomeCreate from "./pages/backend/Income/IncomeCreate";
import IncomeEdit from "./pages/backend/Income/IncomeEdit";
import IncomesIndex from "./pages/backend/Income/IncomesIndex";
import IncomeShow from "./pages/backend/Income/IncomeShow";
import ExpenseIndex from "./pages/backend/Expense/ExpenseIndex";
import ExpenseCreate from "./pages/backend/Expense/ExpenseCreate";
import ExpenseEdit from "./pages/backend/Expense/ExpenseEdit";
import ExpenseShow from "./pages/backend/Expense/ExpenseShow";
import Setting from "./pages/backend/Setting";

function App() {
  return (
    <AuthProvider>
      <Router>
          <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              {/* Public Routes with FrontendLayout */}
              <Route element={<PublicRoute />}>
                <Route element={<FrontendLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Route>

              {/* Protected Routes with BackendLayout */}
              <Route path="/admin/" element={<ProtectedRoute />}>
                <Route element={<BackendLayout />}>
                  {/* 👉 /admin/dashboard */}
                  <Route path="dashboard" element={<Dashboard />} />

                  {/* 👉 /admin/users */}
                  <Route path="users" element={<UserIndex />} />

                  {/* 👉 /admin/dashboard/profile */}
                  <Route path="profile" element={<Profile />} />

                  {/* 👉 /admin/dashboard/profile/edit/1 (id dynamic) */}
                  <Route path="profile/edit/:id" element={<ProfileEdit />} />

                  {/* 👉 /admin/dashboard/income */}
                  <Route path="income" element={<IncomesIndex />} />

                  {/* 👉 /admin/dashboard/income/create */}
                  <Route path="income/create" element={<IncomeCreate />} />

                  {/* 👉 /admin/dashboard/income/edit/1 (id dynamic) */}
                  <Route path="income/edit/:id" element={<IncomeEdit />} />

                  {/* 👉 /admin/dashboard/income/show/1 (id dynamic) */}
                  <Route path="income/show/:id" element={<IncomeShow />} />

                  {/* 👉 /admin/dashboard/expense */}
                  <Route path="expense" element={<ExpenseIndex />} />

                  {/* 👉 /admin/expense/create */}
                  <Route path="expense/create" element={<ExpenseCreate />} />

                  {/* 👉 /admin/expense/edit/1 (id dynamic) */}
                  <Route path="expense/edit/:id" element={<ExpenseEdit />} />

                  {/* 👉 /admin/expense/show/1 (id dynamic) */}
                  <Route path="expense/show/:id" element={<ExpenseShow />} />
                  <Route path="setting" element={<Setting />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route
                path="*"
                element={<div className="p-8 text-center text-slate-800 dark:text-white">404 - Not Found</div>}
              />
            </Routes>
          </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
