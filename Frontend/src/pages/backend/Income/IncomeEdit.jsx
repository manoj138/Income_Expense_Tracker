import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/common/Card";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import DatePicker from "../../../components/common/DatePicker";
import Button from "../../../components/common/Button";
import { useToast } from "../../../components/common/Toast";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { ArrowLeft, Edit3, Save, Sparkles } from "lucide-react";

const IncomeEdit = () => {
  const { addToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [incomeData, setIncomeData] = useState({
    income_source: "",
    income_amount: "",
    income_method: "",
    income_time: "",
    income_date: "",
  });
  const [error, setError] = useState({});

  const fetchIncome = async () => {
    try {
      const res = await Api.get(`/income/${id}/find`);
      setIncomeData(res.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const inputHandler = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`/income/${id}/update`, incomeData);
      addToast("Income Updated Successfully", "success");
      navigate("/admin/income");
    } catch (error) {
      handleApiError(error, setError, addToast);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="flex flex-col items-center w-full relative z-10">
          {/* Page Header */}
          <div className="w-full max-w-2xl flex justify-between items-end mb-6 sm:mb-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-blue-600 mb-1 sm:mb-2">
                <Edit3 size={14} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                  Protocol Edit Mode
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter truncate">
                Modify <span className="italic text-blue-600">Entry</span>
              </h1>
            </div>

            <Link
              to="/admin/income"
              className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 sm:px-5 sm:py-2.5 sm:rounded-2xl"
            >
              <ArrowLeft size={16} />
              <span className="text-[9px] uppercase tracking-widest hidden sm:inline">
                Back
              </span>
            </Link>
          </div>

          {/* Luxury Glassmorphism Form Card */}
          <Card className="w-full max-w-2xl min-h-fit bg-white/80 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
            <form onSubmit={submitHandler} className="space-y-6 sm:space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <Input
                  label={"Income Source"}
                  name={"income_source"}
                  value={incomeData.income_source}
                  onChange={inputHandler}
                  error={error.income_source}
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20"
                />

                <Input
                  label={"Amount (INR)"}
                  name={"income_amount"}
                  type="number"
                  value={incomeData.income_amount}
                  onChange={inputHandler}
                  error={error.income_amount}
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-emerald-600 font-bold"
                />

                <Select
                  name={"income_method"}
                  value={incomeData.income_method}
                  onChange={inputHandler}
                  label="Settlement Method"
                  error={error.income_method}
                  options={[
                    { label: "UPI", value: "UPI" },
                    { label: "Cash", value: "Cash" },
                    { label: "Net Banking", value: "Net Banking" },
                    { label: "Debit Card", value: "Debit Card" },
                    { label: "Credit Card", value: "Credit Card" },
                  ]}
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20"
                />

                <DatePicker
                  label="Transaction Date"
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
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 rounded-full border border-blue-500/10 hidden sm:flex">
                  <Sparkles size={14} className="text-blue-500" />
                  <span className="text-[9px] font-[1000] text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Secure Update Protocol
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-[1000] rounded-2xl sm:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] sm:px-12 sm:py-4 sm:text-[11px]"
                >
                  <Save size={18} /> Update Record
                </Button>
              </div>
            </form>

            <div className="absolute top-0 right-0 p-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none transform rotate-12">
              <Edit3 size={150} />
            </div>
          </Card>

          <div className="mt-10 text-center opacity-30">
            <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500 text-center">
              Capital Ledger Authentication System v2.0
            </p>
          </div>
    </div>
  );
};

export default IncomeEdit;
