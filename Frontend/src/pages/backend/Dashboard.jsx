import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import { Api, BASE_URL } from "../../components/common/Api/api";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Sparkles,
  Zap,
  Crown,
  TrendingUp,
} from "lucide-react";
import Asidebar from "./Asidebar";
import Navbar from "./Navbar";
import WaveChart from "../../components/project/WaveChart";

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [totalAmount, setTotalAmount] = useState({});
  console.log("🚀 ~ Dashboard ~ totalAmount:", totalAmount);

  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToatal = async () => {
    try {
      const totalData = await Api.get("/dashboard");

      setTotalAmount(totalData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchToatal();
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden transition-all duration-700 font-sans">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Elite Background Mesh Gradients (Matching Profile Style) */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

        <Navbar />

        <main className="flex-1 p-6 md:p-12 overflow-y-auto relative z-10 scrollbar-hide">
          {/* Elite Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="p-1 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl shadow-2xl transition-transform group-hover:scale-110 duration-500">
                    <div className="h-20 w-20 rounded-[1.4rem] overflow-hidden border-4 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-4xl">
                      {userData?.user_image ? (
                        <img
                          src={`${BASE_URL}/${userData.user_image}`}
                          className="h-full w-full object-cover"
                          alt="user"
                        />
                      ) : (
                        "👋"
                      )}
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-4 border-[#F8FAFC] dark:border-[#020617] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 dark:text-white tracking-[ -0.05em] leading-tight">
                      Welcome,{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent italic tracking-tighter uppercase">
                        {userData?.name?.split(" ")[0] || "Chief"}
                      </span>
                    </h1>
                    <Crown
                      className="text-amber-500 animate-bounce hidden md:block"
                      size={32}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] mt-3">
                    <Zap size={14} className="text-blue-500 fill-current" />{" "}
                    Quantum Assets Control Hub
                  </p>
                </div>
              </div>
            </div>

            {/* Live Session Badge */}
            <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-white/5 px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 transition-all hover:scale-105">
              <div className="relative h-3 w-3">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative h-3 w-3 bg-blue-600 rounded-full shadow-[0_0_15px_#2563eb]"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  Active System State
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                  March 2026 / ID: {user.id}
                </span>
              </div>
            </div>
          </header>

          {/* Finance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
            {/* Total Revenue - Emerald Glass */}
            <Card
              onClick={() => navigate("/admin/income")}
              className="group cursor-pointer relative overflow-hidden  bg-slate-950 dark:bg-emerald-600 rounded-[3.5rem] p-10 shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)] transition-all duration-700 hover:-translate-y-4 border-0"
            >
              <div className="flex justify-between items-start relative z-20">
                <div
                  className="p-5 
                            bg-emerald-100 dark:bg-white/10 
                               backdrop-blur-xl 
                               text-emerald-700 dark:text-emerald-200
                                 border border-slate-200 dark:border-white/20 
                                   rounded-3xl 
                                     group-hover:rotate-12 
                                         transition-transform duration-500"
                >
                  <ArrowDownCircle size={40} strokeWidth={2.5} />
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md 
                              text-emerald-700 dark:text-emerald-200 
                                   text-[9px] font-[1000] rounded-full 
                                     border border-emerald-500/20 uppercase tracking-[0.2em]"
                  >
                    System Inflow
                  </span>
                  <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-200  animate-pulse">
                    <TrendingUp size={12} />
                    <span className="text-[8px] font-black tracking-widest">
                      +14.2%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-20">
                <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-200 uppercase tracking-[0.4em]">
                  Total Revenue Managed
                </p>
                {/* High contrast text-white for visibility on dark background */}
                <h3 className="text-6xl font-[1000] text-black/80 dark:text-white mt-3 tracking-tighter tabular-nums drop-shadow-2xl">
                  ₹{totalAmount.income}
                </h3>

                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center opacity-40">
                  <p className="text-[10px] font-mono text-black dark:text-white tracking-[0.3em]">
                    CREDIT PROTOCOL
                  </p>
                  <p className="text-[9px] font-black text-white uppercase italic tracking-widest">
                    Secure Entry
                  </p>
                </div>
              </div>

              {/* Luxury Shine & Background Icon */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
              <ArrowDownCircle
                className="absolute -bottom-12 -right-12  text-emerald-500/20 dark:text-emerald-700/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 pointer-events-none"
                size={280}
              />
            </Card>

            {/* Total Expenses - Rose Glass */}
            <Card
              onClick={() => navigate("/admin/expense")}
              className="group cursor-pointer relative overflow-hidden  dark:bg-rose-600 rounded-[3.5rem] p-10 shadow-[0_40px_100px_-20px_rgba(244,63,94,0.3)] transition-all duration-700 hover:-translate-y-4 border-0"
            >
              <div className="flex justify-between items-start relative z-20">
                {/* Icon with Glass effect */}
                <div className="p-5  backdrop-blur-xl  bg-rose-100 dark:bg-white/10   text-rose-700 dark:text-rose-200 border border-white/20 rounded-3xl group-hover:-rotate-12 transition-transform duration-500">
                  <ArrowUpCircle size={40} strokeWidth={2.5} />
                </div>

                {/* Status Badge */}
                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1.5 bg-rose-500/20 dark:bg-rose-500/20 backdrop-blur-md text-rose-600 dark:text-rose-200 text-[9px] font-[1000] rounded-full border border-rose-500/20 uppercase tracking-[0.2em] animate-pulse">
                    Live Drain
                  </span>
                  <div className="h-1 w-12 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-400"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-20">
                <p className="text-[10px] font-black text-rose-600 dark:text-rose-200 uppercase tracking-[0.4em]">
                  Operational Outflow
                </p>
                {/* Text color 'text-white' kept for high visibility on dark background */}
                <h3 className="text-6xl font-[1000] text-black/80 dark:text-white mt-3 tracking-tighter tabular-nums drop-shadow-2xl">
                  ₹{totalAmount.expense}
                </h3>

                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center opacity-40">
                  <p className="text-[10px] font-mono text-black/80 dark:text-white tracking-[0.3em]">
                    DEBIT PROTOCOL
                  </p>
                  <p className="text-[9px] font-black text-black/80 dark:text-white uppercase italic tracking-widest">
                    Secure Exit
                  </p>
                </div>
              </div>

              {/* Background Animations */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
              <ArrowUpCircle
                className="absolute -bottom-12 -right-12 text-rose-500/20 dark:text-rose-700/20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 pointer-events-none"
                size={280}
              />
            </Card>

            {/* Net Assets - Deep Blue Elite Card */}
            <Card className="group relative overflow-hidden bg-slate-950 dark:bg-indigo-600 rounded-[3.5rem] p-10 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] transition-all duration-700 hover:-translate-y-4 border-0">
              <div className="flex justify-between items-start relative z-20">
                {/* Icon with Glass effect */}
                <div className="p-5 bg-indigo-300/30 dark:bg-white/10 backdrop-blur-xl text-indigo-400 dark:text-white border border-white/20 rounded-3xl group-hover:rotate-6 transition-transform duration-500">
                  <Wallet size={40} strokeWidth={2.5} />
                </div>

                {/* Premium Identity Section */}
                <div className="flex flex-col items-end gap-3">
                  <div className="px-4 py-1.5 bg-indigo-600/20 dark:bg-indigo-500/20  backdrop-blur-md text-indigo-400 dark:text-indigo-200 text-[9px] font-[1000] rounded-full border border-indigo-500/20 uppercase tracking-[0.2em]">
                    Net Assets
                  </div>
                  {/* Mini Progress Bar */}
                  <div className="h-1.5 w-12 bg-indigo-600/20 dark:bg-indigo-500/20  rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 animate-pulse"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-20">
                <p className="text-[10px] font-black text-indigo-500 dark:text-indigo-300 uppercase tracking-[0.4em]">
                  Available Capital
                </p>
                {/* High contrast white text for maximum visibility */}
                <h3 className="text-6xl font-[1000] text-black/80 dark:text-white mt-3 tracking-tighter tabular-nums drop-shadow-2xl">
                  ₹{totalAmount.netBalance}
                </h3>

                {/* Secured Footer Details */}
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center opacity-40">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-indigo-700 rounded-full animate-ping" />
                    <p className="text-[10px] font-mono text-black/80 dark:text-white tracking-[0.3em]">
                      **** 2026
                    </p>
                  </div>
                  <p className="text-[9px] font-black text-black/80 dark:text-white uppercase italic tracking-widest">
                    {userData?.name?.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* Background Animations & Large Icon */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
              <Wallet
                className="absolute -bottom-12 -right-12 text-indigo-500/20 dark:text-indigo-700/20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 pointer-events-none"
                size={280}
              />
            </Card>
          </div>

          <Card>
            <WaveChart />
          </Card>

          {/* Security Note (Consistent with Profile) */}
          <div className="mt-16 flex justify-center items-center gap-6 text-slate-400 dark:text-slate-600">
            <div className="h-px w-16 bg-slate-200 dark:bg-slate-800" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">
              System Encrypted Identity Protocol
            </p>
            <div className="h-px w-16 bg-slate-200 dark:bg-slate-800" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
