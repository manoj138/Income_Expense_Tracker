import React, { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  User2,
  UserPlus,
} from "lucide-react";
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
      console.log("submitHandler error:", error.response?.data);
      handleApiError(error, setError, addToast);
    }
  };

  return (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 shadow-[0_45px_120px_-45px_rgba(16,185,129,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:rounded-[2.5rem]">
      <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl sm:h-48 sm:w-48" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl sm:h-56 sm:w-56" />

      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hidden bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700 p-10 text-white lg:block">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
            <Sparkles size={14} />
            New Account Setup
          </div>

          <div className="mt-16">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.7rem] bg-white/12 backdrop-blur-md">
              <BadgeCheck size={28} />
            </div>
            <h1 className="max-w-sm text-5xl font-[1000] leading-none tracking-[-0.06em]">
              Build your personal finance space in minutes.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/85">
              Create your account, organize records, and start tracking income
              and expenses with a cleaner workflow.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl bg-white/12 px-4 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span className="text-sm font-bold">Protected user access</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/12 px-4 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <UserPlus size={18} />
                <span className="text-sm font-bold">Quick onboarding flow</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-5 rounded-[1.8rem] bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700 p-5 text-white shadow-[0_20px_60px_-30px_rgba(16,185,129,0.75)] lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[9px] font-black uppercase tracking-[0.22em]">
                <Sparkles size={13} />
                New Account Setup
              </div>
              <h1 className="mt-4 text-2xl font-[1000] leading-[0.95] tracking-[-0.05em]">
                Start your finance journey with a cleaner setup.
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/85">
                Create your account and organize income and expense records easily.
              </p>
            </div>

            <div className="mb-6 text-center lg:mb-8 lg:text-left">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-emerald-500 shadow-lg shadow-emerald-200 sm:h-14 sm:w-14 sm:rounded-[1.4rem] lg:mx-0">
                <UserPlus className="text-white" size={26} />
              </div>
              <h2 className="text-[1.9rem] font-[1000] tracking-[-0.05em] text-slate-900 sm:text-3xl dark:text-white">
                Create your SmartWallet account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your details below and start managing income and expenses
                from one place.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 gap-4 rounded-[1.6rem] border border-slate-100 bg-white/75 p-4 shadow-sm dark:border-white/5 dark:bg-slate-950/30 md:grid-cols-2 sm:rounded-[2rem] sm:p-5">
                <Input
                  label="Full Name"
                  error={error.name}
                  icon={User}
                  placeholder="John Doe"
                  name="name"
                  value={user.name}
                  onChange={inputHandler}
                />

                <Input
                  label="Username"
                  error={error.user_name}
                  icon={User2}
                  placeholder="johndoe_01"
                  name="user_name"
                  value={user.user_name}
                  onChange={inputHandler}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Email Address"
                    error={error.email}
                    icon={Mail}
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={user.email}
                    onChange={inputHandler}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="********"
                    name="password"
                    value={user.password}
                    onChange={inputHandler}
                    error={error.password}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-[0_24px_50px_-24px_rgba(16,185,129,0.75)] transition-all active:scale-[0.98] hover:bg-emerald-600 sm:py-5"
              >
                <UserPlus size={18} />
                Get Started
              </Button>

              <p className="px-2 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-blue-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
