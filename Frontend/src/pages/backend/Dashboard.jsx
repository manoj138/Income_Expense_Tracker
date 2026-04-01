import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/common/Card";
import { Api } from "../../components/common/Api/api";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CircleUserRound,
  Crown,
  IndianRupee,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import WaveChart from "../../components/project/WaveChart";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/common/PageLoader";

const formatMoney = (value) => Number(value || 0).toLocaleString("en-IN");

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [totalAmount, setTotalAmount] = useState({
    income: 0,
    expense: 0,
    netBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sessionLabel = new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotal = async () => {
    try {
      const totalData = await Api.get("/dashboard");
      setTotalAmount(totalData.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTotal();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <header className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="relative group shrink-0">
              <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.2rem] border-4 border-white bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 dark:border-slate-900 sm:h-20 sm:w-20 transition-all duration-500 group-hover:rotate-6 shadow-inner">
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-full">
                    <CircleUserRound size={36} strokeWidth={1.5} className="sm:size-10" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#F8FAFC] bg-emerald-500 dark:border-[#020617]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-xl font-[1000] leading-tight tracking-[-0.05em] text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent italic tracking-tighter uppercase shrink-0">
                    {userData?.name?.split(" ")[0] || "Chief"}
                  </span>
                </h1>
                <Crown className="hidden animate-bounce text-amber-500 sm:block shrink-0" size={24} />
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 sm:mt-3 sm:text-[10px] sm:tracking-[0.35em] dark:text-slate-500">
                <Zap size={14} className="fill-current text-blue-500 shrink-0" />
                Quantum Assets Control Hub
              </p>
            </div>
          </div>
        </div>

        <div className="flex max-w-full items-center gap-4 self-start rounded-[2rem] border border-white bg-white/70 px-5 py-4 shadow-2xl backdrop-blur-2xl transition-all dark:border-white/5 dark:bg-slate-900/40">
          <div className="relative h-3 w-3 shrink-0">
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            <div className="relative h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_15px_#2563eb]" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              Active System State
            </span>
            <span className="block truncate text-xs font-bold uppercase tracking-tighter text-slate-900 dark:text-white">
              {sessionLabel} / ID: {user.id}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        <Card
          onClick={() => navigate("/admin/income")}
          className="group relative cursor-pointer overflow-hidden rounded-[2rem] border-0 bg-slate-950 p-6 shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-emerald-600 sm:rounded-[2.5rem] sm:p-8"
        >
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-slate-200 bg-emerald-100 p-4 text-emerald-700 backdrop-blur-xl transition-transform duration-500 group-hover:rotate-12 dark:border-white/20 dark:bg-white/10 dark:text-emerald-200 sm:p-5">
              <ArrowDownCircle size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">
                System Inflow
              </span>
              <div className="flex items-center gap-1 text-emerald-700 animate-pulse dark:text-emerald-200">
                <TrendingUp size={12} />
                <span className="text-[8px] font-black tracking-widest">+14.2%</span>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-200">
              Total Revenue Managed
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={22} strokeWidth={2.5} className="shrink-0 sm:size-7" />
              <h3 className="text-4xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.income)}
              </h3>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8 opacity-40">
              <p className="text-[10px] font-mono tracking-[0.3em] text-black dark:text-white">
                CREDIT PROTOCOL
              </p>
              <p className="text-[9px] font-black uppercase italic tracking-widest text-white">
                Secure Entry
              </p>
            </div>
          </div>

          <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
          <ArrowDownCircle
            className="pointer-events-none absolute -right-10 -bottom-10 text-emerald-500/20 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12 dark:text-emerald-700/20"
            size={220}
          />
        </Card>

        <Card
          onClick={() => navigate("/admin/expense")}
          className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-0 p-6 shadow-[0_40px_100px_-20px_rgba(244,63,94,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-rose-600 sm:p-8"
        >
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-white/20 bg-rose-100 p-4 text-rose-700 backdrop-blur-xl transition-transform duration-500 group-hover:-rotate-12 dark:bg-white/10 dark:text-rose-200 sm:p-5">
              <ArrowUpCircle size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full border border-rose-500/20 bg-rose-500/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-rose-600 animate-pulse dark:text-rose-200">
                Live Drain
              </span>
              <div className="h-1 w-12 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[45%] bg-rose-400" />
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-rose-600 dark:text-rose-200">
              Operational Outflow
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={22} strokeWidth={2.5} className="shrink-0 sm:size-7" />
              <h3 className="text-4xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.expense)}
              </h3>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8 opacity-40">
              <p className="text-[10px] font-mono tracking-[0.3em] text-black/80 dark:text-white">
                DEBIT PROTOCOL
              </p>
              <p className="text-[9px] font-black uppercase italic tracking-widest text-black/80 dark:text-white">
                Secure Exit
              </p>
            </div>
          </div>

          <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
          <ArrowUpCircle
            className="pointer-events-none absolute -right-10 -bottom-10 text-rose-500/20 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-12 dark:text-rose-700/20"
            size={220}
          />
        </Card>

        <Card className="group relative overflow-hidden rounded-[2.5rem] border-0 bg-slate-950 p-6 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-indigo-600 sm:p-8">
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-white/20 bg-indigo-300/30 p-4 text-indigo-400 backdrop-blur-xl transition-transform duration-500 group-hover:rotate-6 dark:bg-white/10 dark:text-white sm:p-5">
              <Wallet size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="rounded-full border border-indigo-500/20 bg-indigo-600/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200">
                Net Assets
              </div>
              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-indigo-600/20 dark:bg-indigo-500/20">
                <div className="h-full w-[70%] bg-indigo-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-indigo-500 dark:text-indigo-300">
              Available Capital
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={22} strokeWidth={2.5} className="shrink-0 sm:size-7" />
              <h3 className="text-4xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.netBalance)}
              </h3>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8 opacity-40">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-ping rounded-full bg-indigo-700" />
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/80 dark:text-white">
                  **** 2026
                </p>
              </div>
              <p className="text-[9px] font-black uppercase italic tracking-widest text-black/80 dark:text-white">
                {userData?.name?.split(" ")[0]}
              </p>
            </div>
          </div>

          <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
          <Wallet
            className="pointer-events-none absolute -right-10 -bottom-10 text-indigo-500/20 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-12 dark:text-indigo-700/20"
            size={220}
          />
        </Card>
      </div>

      <div className="mt-8 sm:mt-10">
        <WaveChart />
      </div>

      <div className="mt-12 flex items-center justify-center gap-3 text-slate-400 dark:text-slate-600 sm:gap-6">
        <div className="h-px w-8 bg-slate-200 dark:bg-slate-800 sm:w-16" />
        <p className="text-center text-[10px] font-black uppercase tracking-[0.35em]">
          System Encrypted Identity Protocol
        </p>
        <div className="h-px w-8 bg-slate-200 dark:bg-slate-800 sm:w-16" />
      </div>
    </>
  );
};

export default Dashboard;
