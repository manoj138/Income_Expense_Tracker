import React, { useEffect, useState } from "react";
import { Api, handleApiError } from "../common/Api/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useToast } from "../common/Toast";
import { Activity } from "lucide-react";

const WaveChart = () => {
  const { addToast } = useToast();
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await Api.get("/dashboard");
      setChart(res.data.data.chartData);
    } catch (error) {
      handleApiError(error, null, addToast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Custom Tooltip Style (Profile Style)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs font-bold text-emerald-500">Income</span>
              <span className="text-sm font-black dark:text-white">₹{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs font-bold text-rose-500">Expense</span>
              <span className="text-sm font-black dark:text-white">₹{payload[1].value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="group relative overflow-hidden bg-white/50 dark:bg-slate-900/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2rem] sm:rounded-[3.5rem] p-5 sm:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-700">
      
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-6 sm:mb-10">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[9px] font-[1000] uppercase tracking-[0.3em]">Analytics Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
            Cash <span className="italic text-blue-600">Flow</span>
          </h2>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase">Inflow</span>
           </div>
           <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20">
              <div className="h-1.5 w-1.5 bg-rose-500 rounded-full" />
              <span className="text-[8px] font-black text-rose-600 dark:text-rose-400 uppercase">Outflow</span>
           </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[220px] sm:h-[320px] w-full relative z-10">
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
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorIncome)"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorExpense)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Background Decorative Icon */}
      <Activity
        className="absolute -bottom-10 -left-10 text-blue-500/5 dark:text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-1000"
        size={200}
      />
    </div>
  );
};

export default WaveChart;