import React, { useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { useAuth } from "../../../context/AuthContext";
import {
  ArrowRight,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/common/Toast";

const Login = () => {
  const { addToast } = useToast();
  const { login } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Api.post("/user/login", user);
      if (res.data.data && res.data.data.token) {
        login(res.data.data.findUser, res.data.data.token);
      }

      addToast("login successfully!", "success");
    } catch (error) {
      handleApiError(error, null, addToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 shadow-[0_45px_120px_-45px_rgba(37,99,235,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:rounded-[2.5rem]">
      <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl sm:h-48 sm:w-48" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl sm:h-56 sm:w-56" />

      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-10 text-white lg:block">
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-100 backdrop-blur-md">
            <Sparkles size={14} />
            Secure Access
          </div>

          <div className="mt-24">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.7rem] bg-white/10 backdrop-blur-md">
              <WalletCards size={28} />
            </div>
            <h1 className="max-w-sm text-5xl font-[1000] leading-none tracking-[-0.06em]">
              Welcome back to your money command center.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/80">
              Monitor every transaction, review expense flow, and manage your
              dashboard from one secure place.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-4 backdrop-blur-sm">
              <ShieldCheck size={18} className="text-emerald-300" />
              <span className="text-sm font-bold text-white/90">
                Protected sign-in and streamlined finance tracking
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-4 backdrop-blur-sm">
              <ArrowRight size={18} className="text-blue-300" />
              <span className="text-sm font-bold text-white/90">
                Continue exactly where you left off
              </span>
            </div>
          </div>
        </div>

        <div className="relative p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-5 rounded-[1.8rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-5 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-blue-100">
                <Sparkles size={13} />
                Secure Access
              </div>
              <h1 className="mt-4 text-2xl font-[1000] leading-[0.95] tracking-[-0.05em]">
                Welcome back to your finance dashboard.
              </h1>
              <p className="mt-3 text-sm leading-6 text-blue-100/80">
                Sign in and continue tracking income and expenses from one place.
              </p>
            </div>

            <div className="mb-6 text-center lg:mb-8 lg:text-left">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-blue-600 shadow-lg shadow-blue-200 sm:h-14 sm:w-14 sm:rounded-[1.4rem] lg:mx-0">
                <Lock className="text-white" size={26} />
              </div>
              <h2 className="text-[1.9rem] font-[1000] tracking-[-0.05em] text-slate-900 sm:text-3xl dark:text-white">
                Sign in to SmartWallet
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Use your account credentials to access the dashboard and manage
                your finance records.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
              <div className="space-y-4 rounded-[1.6rem] border border-slate-100 bg-white/75 p-4 shadow-sm dark:border-white/5 dark:bg-slate-950/30 sm:rounded-[2rem] sm:p-5">
                <Input
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={user.email || ""}
                  onChange={inputHandler}
                />

                <div className="space-y-1">
                  <Input
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="********"
                    name="password"
                    value={user.password || ""}
                    onChange={inputHandler}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-[0_24px_50px_-24px_rgba(37,99,235,0.75)] transition-all active:scale-[0.98] hover:bg-blue-700 sm:py-5"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Button>

              <p className="px-2 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
