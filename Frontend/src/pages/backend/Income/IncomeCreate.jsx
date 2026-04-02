import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/common/Card";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import DatePicker from "../../../components/common/DatePicker";
import Button from "../../../components/common/Button";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { useToast } from "../../../components/common/Toast";
import { pushNotification } from "../../../components/common/notifications";
import { ArrowLeft, PlusCircle, Wallet, Sparkles } from "lucide-react";

const IncomeCreate = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [incomeData, setIncomeData] = useState({
    income_source: "",
    income_amount: "",
    income_method: "",
    income_time: "",
    income_date: "",
  });

  const inputHandler = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/income/store", incomeData);
      pushNotification({
        title: "New Income Added",
        message: `${incomeData.income_source || "Income"} of Rs. ${Number(
          incomeData.income_amount || 0
        ).toLocaleString()} was recorded.`,
        type: "income",
      });
      addToast("Income created successfully", "success");
      navigate("/admin/income");
    } catch (error) {
      handleApiError(error, setError, addToast);
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative z-10">
          
          {/* Header Section */}
          <div className="w-full max-w-2xl flex justify-between items-end mb-6 sm:mb-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-emerald-600 mb-1 sm:mb-2">
                <PlusCircle size={14} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Creation Protocol</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter truncate">
                Add <span className="italic text-emerald-600">Revenue</span>
              </h1>
            </div>
            
            <Link to="/admin/income" className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 sm:px-5 sm:py-2.5 sm:rounded-2xl">
              <ArrowLeft size={16} /> 
              <span className="text-[9px] uppercase tracking-widest text-nowrap hidden sm:inline">Back</span>
            </Link>
          </div>

          {/* Luxury Glassmorphism Form Card */}
          <Card className="w-full max-w-2xl min-h-fit bg-white/80 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
            
            <form onSubmit={submitHandler} className="space-y-6 sm:space-y-8 relative z-10">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <Input
                  label={"Income Source"}
                  name={"income_source"}
                  value={incomeData.income_source}
                  onChange={inputHandler}
                  error={error.income_source}
                  placeholder="e.g. Salary, Freelancing"
                />
                
                <Input
                  label={"Amount (INR)"}
                  name={"income_amount"}
                  type="number"
                  value={incomeData.income_amount}
                  onChange={inputHandler}
                  error={error.income_amount}
                  placeholder="0.00"
                />

                <Select
                  name={"income_method"}
                  value={incomeData.income_method}
                  onChange={inputHandler}
                  label="Payment Channel"
                  error={error.income_method}
                  options={[
                    { label: "UPI", value: "UPI" },
                    { label: "Cash", value: "Cash" },
                    { label: "Net Banking", value: "Net Banking" },
                    { label: "Debit Card", value: "Debit Card" },
                    { label: "Credit Card", value: "Credit Card" },
                  ]}
                  placeholder="Choose method..."
                />

                <DatePicker
                  label="Log Date"
                  name={"income_date"}
                  error={error.income_date}
                  value={incomeData.income_date}
                  onChange={inputHandler}
                />

                <Input
                  type="time"
                  label="System Time"
                  name="income_time"
                  value={incomeData.income_time}
                  onChange={inputHandler}
                  error={error?.income_time}
                />
                
              </div>

              {/* Action Section */}
              <div className="pt-8 sm:pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10 hidden sm:flex">
                   <Sparkles size={14} className="text-emerald-500" />
                   <span className="text-[9px] font-[1000] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Secure Ledger Entry</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-[1000] rounded-2xl sm:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] sm:px-12 sm:py-4 sm:text-[11px]"
                >
                  <PlusCircle size={18} /> Add Income
                </Button>
              </div>
            </form>

            {/* Background Icon Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.06] pointer-events-none transform rotate-12">
               <Wallet size={180} />
            </div>
          </Card>

          <div className="mt-10 text-center opacity-30">
             <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">Capital Ledger Authentication System v2.0</p>
          </div>
    </div>
  );
};

export default IncomeCreate;
