import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { Link, useNavigate } from "react-router-dom";
import { User, User2, Mail, Lock } from "lucide-react";
import Card from "../../../components/common/Card";
import { useToast } from "../../../components/common/Toast";

const Register = () => {
  const { addToast } = useToast();
  const [user, setUser] = useState({
    name: "",
    email: "",
    user_name: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/user/register", user);

      navigate("/login");
      addToast("Register successfully", "success");
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error.response.data);
      handleApiError(error, setError, addToast);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
      <Card
        title="Create Account"
        subtitle="Join IE Tracker to manage your finances"
        className="w-full max-w-[450px] shadow-2xl border-none rounded-3xl bg-white"
      >
        <form onSubmit={submitHandler} className="mt-6 space-y-5">
          {/* Name Group: Side-by-side on larger screens if needed, but stacked is also fine */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              label={"Full Name"}
              error={error.name}
              icon={User}
              placeholder={"John Doe"}
              name={"name"}
              value={user.name}
              onChange={inputHandler}
              className="bg-gray-50/50"
            />

            <Input
              label={"Username"}
              error={error.user_name}
              icon={User2}
              placeholder={"johndoe_01"}
              name={"user_name"}
              value={user.user_name}
              onChange={inputHandler}
              className="bg-gray-50/50"
            />
          </div>

          {/* Contact & Security */}
          <div className="space-y-4">
            <Input
              label={"Email Address"}
              error={error.email}
              icon={Mail}
              type="email"
              placeholder={"john@example.com"}
              name={"email"}
              value={user.email}
              onChange={inputHandler}
              className="bg-gray-50/50"
            />

            <Input
              label={"Password"}
              icon={Lock}
              type="password"
              placeholder={"••••••••"}
              name={"password"}
              value={user.password}
              onChange={inputHandler}
              className="bg-gray-50/50"
              error={error.password}
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              Get Started
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
