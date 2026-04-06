import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  CircleUserRound,
  Crown,
  Gauge,
  IndianRupee,
  MoveRight,
  Plus,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/common/Card";
import { Api } from "../../components/common/Api/api";
import WaveChart from "../../components/project/WaveChart";
import PageLoader from "../../components/common/PageLoader";
import ProgressBar from "../../components/common/ProgressBar";
import { formatDateString } from "../../utils/formatDate";

const formatMoney = (value) => Number(value || 0).toLocaleString("en-IN");
const formatChange = (value) => `${value > 0 ? "+" : ""}${Number(value || 0).toFixed(1)}%`;

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [totalAmount, setTotalAmount] = useState({
    income: 0,
    expense: 0,
    netBalance: 0,
    savingsRate: 0,
    monthlyStats: {
      income: { current: 0, previous: 0, change: 0 },
      expense: { current: 0, previous: 0, change: 0 },
    },
    recentTransactions: [],
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

  const savingsProgress = Math.min(Math.max(Number(totalAmount.savingsRate || 0), 0), 100);
  const spendCoverage = totalAmount.income > 0
    ? Math.round((Number(totalAmount.expense || 0) / Number(totalAmount.income || 1)) * 100)
    : 0;
  const insightText = totalAmount.netBalance >= 0
    ? "Income is covering expenses with a positive cash position."
    : "Expenses have crossed income. Review recent outflow and rebalance quickly.";

  const monthlyCards = [
    {
      key: "income",
      label: "Income Momentum",
      amount: totalAmount.monthlyStats?.income?.current,
      previous: totalAmount.monthlyStats?.income?.previous,
      change: totalAmount.monthlyStats?.income?.change,
      tone: "emerald",
    },
    {
      key: "expense",
      label: "Expense Pressure",
      amount: totalAmount.monthlyStats?.expense?.current,
      previous: totalAmount.monthlyStats?.expense?.previous,
      change: totalAmount.monthlyStats?.expense?.change,
      tone: "rose",
    },
  ];

  const quickActions = [
    {
      label: "Add Income",
      icon: Plus,
      description: "Record a fresh income entry",
      to: "/admin/income/create",
      className:
        "from-emerald-500/15 to-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-200",
    },
    {
      label: "Add Expense",
      icon: Receipt,
      description: "Track an outgoing payment",
      to: "/admin/expense/create",
      className:
        "from-rose-500/15 to-rose-500/5 border-rose-500/20 text-rose-700 dark:text-rose-200",
    },
  ];

  return (
    <>
      <header className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:gap-5 xl:flex-row xl:items-center">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="relative group shrink-0">
              <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.2rem] border-4 border-white bg-slate-100 text-blue-600 shadow-inner transition-all duration-500 group-hover:rotate-6 dark:border-slate-900 dark:bg-slate-800 dark:text-blue-400 sm:h-20 sm:w-20">
                  <div className="rounded-full bg-blue-500/10 p-3 dark:bg-blue-500/20">
                    <CircleUserRound size={36} strokeWidth={1.5} className="sm:size-10" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#F8FAFC] bg-emerald-500 dark:border-[#020617]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-xl font-[1000] leading-tight tracking-[-0.05em] text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Welcome,{" "}
                  <span className="shrink-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent italic tracking-tighter uppercase">
                    {userData?.name?.split(" ")[0] || "Chief"}
                  </span>
                </h1>
                <Crown className="hidden shrink-0 animate-bounce text-amber-500 sm:block" size={24} />
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 sm:mt-3 sm:text-[10px] sm:tracking-[0.35em]">
                <Zap size={14} className="shrink-0 fill-current text-blue-500" />
                Quantum Assets Control Hub
              </p>
            </div>
          </div>
        </div>

        <div className="flex max-w-full items-center gap-3 self-start rounded-[1.5rem] border border-white bg-white/70 px-4 py-3 shadow-2xl backdrop-blur-2xl transition-all dark:border-white/5 dark:bg-slate-900/40 sm:rounded-[2rem] sm:px-5 sm:py-4">
          <div className="relative h-3 w-3 shrink-0">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75" />
            <div className="relative h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_15px_#2563eb]" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              Active System State
            </span>
            <span className="block truncate text-xs font-bold uppercase tracking-tighter text-slate-900 dark:text-white">
              {sessionLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        <Card
          onClick={() => navigate("/admin/income")}
          className="group relative cursor-pointer overflow-hidden rounded-[2rem] border-0 bg-slate-950 p-5 shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-emerald-600 sm:rounded-[2.5rem] sm:p-8"
        >
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-slate-200 bg-emerald-100 p-4 text-emerald-700 backdrop-blur-xl transition-transform duration-500 group-hover:rotate-12 dark:border-white/20 dark:bg-white/10 dark:text-emerald-200 sm:p-5">
              <ArrowDownCircle size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">
                System Inflow
              </span>
              <div className="flex items-center gap-1 animate-pulse text-emerald-700 dark:text-emerald-200">
                <TrendingUp size={12} />
                <span className="text-[8px] font-black tracking-widest">
                  {formatChange(totalAmount.monthlyStats?.income?.change)}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-6 sm:mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-200">
              Total Revenue Managed
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={18} strokeWidth={2.5} className="shrink-0 sm:size-[22px]" />
              <h3 className="text-3xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.income)}
              </h3>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 opacity-40 sm:mt-8 sm:pt-8">
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
          className="group relative cursor-pointer overflow-hidden rounded-[2rem] border-0 p-5 shadow-[0_40px_100px_-20px_rgba(244,63,94,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-rose-600 sm:rounded-[2.5rem] sm:p-8"
        >
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-white/20 bg-rose-100 p-4 text-rose-700 backdrop-blur-xl transition-transform duration-500 group-hover:-rotate-12 dark:bg-white/10 dark:text-rose-200 sm:p-5">
              <ArrowUpCircle size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full border border-rose-500/20 bg-rose-500/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-rose-600 animate-pulse dark:text-rose-200">
                Live Drain
              </span>
              <div className="flex items-center gap-1 text-rose-600 dark:text-rose-200">
                <TrendingUp size={12} />
                <span className="text-[8px] font-black tracking-widest">
                  {formatChange(totalAmount.monthlyStats?.expense?.change)}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-6 sm:mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-rose-600 dark:text-rose-200">
              Operational Outflow
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={18} strokeWidth={2.5} className="shrink-0 sm:size-[22px]" />
              <h3 className="text-3xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.expense)}
              </h3>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 opacity-40 sm:mt-8 sm:pt-8">
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

        <Card className="group relative overflow-hidden rounded-[2rem] border-0 bg-slate-950 p-5 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] transition-all duration-700 hover:-translate-y-2 dark:bg-indigo-600 sm:col-span-2 sm:rounded-[2.5rem] sm:p-8 lg:col-span-1">
          <div className="relative z-20 flex items-start justify-between gap-4">
            <div className="rounded-3xl border border-white/20 bg-indigo-300/30 p-4 text-indigo-400 backdrop-blur-xl transition-transform duration-500 group-hover:rotate-6 dark:bg-white/10 dark:text-white sm:p-5">
              <Wallet size={34} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="rounded-full border border-indigo-500/20 bg-indigo-600/20 px-3 py-1.5 text-[9px] font-[1000] uppercase tracking-[0.2em] text-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200">
                Net Assets
              </div>
              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-indigo-600/20 dark:bg-indigo-500/20">
                <div className="h-full bg-indigo-400 animate-pulse" style={{ width: `${savingsProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-6 sm:mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-indigo-500 dark:text-indigo-300">
              Available Capital
            </p>
            <div className="mt-2 flex items-center gap-2 text-black/80 dark:text-white sm:mt-3">
              <IndianRupee size={18} strokeWidth={2.5} className="shrink-0 sm:size-[22px]" />
              <h3 className="text-3xl font-[1000] tracking-tighter tabular-nums drop-shadow-2xl sm:text-4xl xl:text-5xl">
                {formatMoney(totalAmount.netBalance)}
              </h3>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 opacity-40 sm:mt-8 sm:pt-8">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-ping rounded-full bg-indigo-700" />
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/80 dark:text-white">
                  SAVINGS {savingsProgress}%
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

      <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-8">
        <WaveChart /> 
         <Card className="overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] backdrop-blur-[40px] dark:border-white/5 dark:bg-slate-900/40 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                Live Feed
              </p>
              <h2 className="mt-2 text-2xl font-[1000] tracking-tighter text-slate-900 dark:text-white">
                Recent Transactions
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/income")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 transition-colors hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300"
            >
              Open Ledger <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {totalAmount.recentTransactions?.length > 0 ? (
              totalAmount.recentTransactions.map((item) => {
                const isIncome = item.type === "income";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-slate-950/40"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`rounded-2xl p-3 ${
                          isIncome
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-300"
                        }`}
                      >
                        {isIncome ? <ArrowDownCircle size={18} /> : <ArrowUpCircle size={18} />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-[1000] text-slate-900 dark:text-white">
                          {item.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          <span>{item.method}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                          <span>{formatDateString(item.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`flex items-center justify-end gap-1 text-sm font-[1000] ${
                          isIncome ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"
                        }`}
                      >
                        <IndianRupee size={14} />
                        {formatMoney(item.amount)}
                      </p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {isIncome ? "Income" : "Expense"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300/80 bg-slate-50/60 p-8 text-center dark:border-white/10 dark:bg-slate-950/30">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  No recent transactions yet.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/admin/income/create")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white"
                >
                  Add First Entry <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-8">
      
         <Card className="overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] backdrop-blur-[40px] dark:border-white/5 dark:bg-slate-900/40 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                Quick Access
              </p>
              <h2 className="mt-2 text-2xl font-[1000] tracking-tighter text-slate-900 dark:text-white">
                Fast Actions
              </h2>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
              Frontline Controls
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => navigate(action.to)}
                  className={`group rounded-[1.75rem] border bg-gradient-to-br p-5 text-left transition-all duration-500 hover:-translate-y-1 ${action.className}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-white/70 p-3 text-slate-900 shadow-sm dark:bg-slate-950/40 dark:text-white">
                      <Icon size={20} />
                    </div>
                    <MoveRight className="text-current transition-transform duration-500 group-hover:translate-x-1" size={18} />
                  </div>
                  <h3 className="mt-6 text-lg font-[1000] tracking-tight">{action.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-blue-500/15 bg-blue-500/10 p-5">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/80 p-3 text-blue-600 shadow-sm dark:bg-slate-950/40 dark:text-blue-300">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">
                  Smart Insight
                </p>
                <p className="mt-2 text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-200">
                  {totalAmount.netBalance >= 0
                    ? "Positive balance detected. Keep expense growth lower than income momentum to preserve savings."
                    : "Negative balance detected. Review recurring expense entries first to restore balance."}
                </p>
              </div>
            </div>
          </div>
        </Card>


        <Card className="overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] backdrop-blur-[40px] dark:border-white/5 dark:bg-slate-900/40 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                Capital Health
              </p>
              <h2 className="mt-2 text-2xl font-[1000] tracking-tighter text-slate-900 dark:text-white">
                Savings Rate
              </h2>
            </div>
            <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-300">
              <Gauge size={24} />
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-[1000] tracking-tighter text-slate-900 dark:text-white">
                {savingsProgress}%
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {insightText}
              </p>
            </div>
            <div className="hidden h-24 w-24 items-center justify-center rounded-full border-[10px] border-indigo-500/15 text-lg font-[1000] text-indigo-600 dark:flex dark:text-indigo-300">
              {savingsProgress}%
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar
              value={savingsProgress}
              max={100}
              variant={totalAmount.netBalance >= 0 ? "success" : "danger"}
              size="lg"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/5 dark:bg-slate-950/40">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Net Balance
              </p>
              <p className="mt-2 flex items-center gap-1 text-lg font-[1000] text-slate-900 dark:text-white">
                <IndianRupee size={15} />
                {formatMoney(totalAmount.netBalance)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/5 dark:bg-slate-950/40">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Coverage
              </p>
              <p className="mt-2 text-lg font-[1000] text-slate-900 dark:text-white">
                {totalAmount.income > 0 ? `${Math.min(spendCoverage, 999)}% spent` : "No income yet"}
              </p>
            </div>
          </div>
        </Card>
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
