import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity } from "lucide-react";
import { Api, handleApiError } from "../common/Api/api";
import { useToast } from "../common/Toast";

const WaveChart = () => {
  const { addToast } = useToast();
  const [chart, setChart] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await Api.get("/dashboard");
      setChart(res.data.data.chartData);
    } catch (error) {
      handleApiError(error, null, addToast);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {label}
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs font-bold text-emerald-500">Income</span>
              <span className="text-sm font-black dark:text-white">
                Rs. {payload[0]?.value?.toLocaleString?.() || 0}
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs font-bold text-rose-500">Expense</span>
              <span className="text-sm font-black dark:text-white">
                Rs. {payload[1]?.value?.toLocaleString?.() || 0}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white/50 p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] backdrop-blur-[40px] transition-all duration-700 dark:border-white/5 dark:bg-slate-900/40 sm:rounded-[3.5rem] sm:p-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:mb-10">
        <div>
          <div className="mb-1 flex items-center gap-2 text-blue-600">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[9px] font-[1000] uppercase tracking-[0.3em]">
              Analytics Engine
            </span>
          </div>
          <h2 className="text-xl font-[1000] tracking-tighter text-slate-900 dark:text-white sm:text-2xl">
            Cash <span className="italic text-blue-600">Flow</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-black uppercase text-emerald-600 dark:text-emerald-400">
              Inflow
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span className="text-[8px] font-black uppercase text-rose-600 dark:text-rose-400">
              Outflow
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-[220px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.1} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }}
            />
            <Area
              type="natural"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={5}
              fillOpacity={1}
              fill="url(#colorIncome)"
              strokeLinecap="round"
              strokeLinejoin="round"
              activeDot={{ r: 6, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
              animationDuration={2000}
            />
            <Area
              type="natural"
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={5}
              fillOpacity={1}
              fill="url(#colorExpense)"
              strokeLinecap="round"
              strokeLinejoin="round"
              activeDot={{ r: 6, fill: "#f43f5e", stroke: "#ffffff", strokeWidth: 2 }}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Activity
        className="pointer-events-none absolute -bottom-10 -left-10 text-blue-500/5 transition-transform duration-1000 group-hover:scale-110 dark:text-blue-500/10"
        size={200}
      />
    </div>
  );
};

export default WaveChart;
