import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { useToast } from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import DatePicker from "../../../components/common/DatePicker";
import FileUpload from "../../../components/common/FileUpload";
import Button from "../../../components/common/Button";
import { ArrowLeft, PlusCircle, CreditCard, Sparkles } from "lucide-react";

// Layout Components
import Asidebar from "../Asidebar";
import Navbar from "../Navbar";

const ExpenseCreate = () => {
  const { addToast } = useToast();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState({
    ex_source: "",
    ex_amount: "",
    ex_method: "",
    ex_image: "",
    ex_time: "",
    ex_date: "",
  });

  const inputHandler = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/expense/store", expenseData);
      addToast("Expense record created successfully", "success");
      navigate("/admin/expense");
    } catch (error) {
      handleApiError(error, setError, addToast);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden transition-all duration-700">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Decorative Glows */}
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-rose-500/[0.05] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[300px] h-[300px] bg-amber-500/[0.05] blur-[80px] rounded-full pointer-events-none" />

        <Navbar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10 flex flex-col items-center">
          
          {/* Header Section */}
          <div className="w-full max-w-2xl flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 text-rose-600 mb-2">
                <PlusCircle size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expense Logging</span>
              </div>
              <h1 className="text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
                Add New <span className="italic text-rose-600 text-5xl">Expense</span>
              </h1>
            </div>
            
            <Link to="/admin/expense" className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">
              <ArrowLeft size={18} /> 
              <span className="text-[10px] uppercase tracking-widest">Back to Ledger</span>
            </Link>
          </div>

          {/* Luxury Form Card */}
          <Card className="w-full max-w-2xl min-h-fit bg-white/80 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[3.5rem] p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
            
            <form onSubmit={submitHandler} className="space-y-8 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label={"Expense Source"}
                  name={"ex_source"}
                  value={expenseData.ex_source}
                  onChange={inputHandler}
                  error={error.ex_source}
                  placeholder="e.g. Rent, Grocery, Internet"
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-rose-500/20"
                />
                
                <Input
                  label={"Amount (INR)"}
                  name={"ex_amount"}
                  type="number"
                  value={expenseData.ex_amount}
                  onChange={inputHandler}
                  error={error.ex_amount}
                  placeholder="0.00"
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-rose-500/20 text-rose-600 font-bold"
                />

                <Select
                  name={"ex_method"}
                  value={expenseData.ex_method}
                  onChange={inputHandler}
                  label="Payment Channel"
                  error={error.ex_method}
                  options={[
                    { label: "UPI", value: "UPI" },
                    { label: "Cash", value: "Cash" },
                    { label: "Net Banking", value: "Net Banking" },
                    { label: "Debit Card", value: "Debit Card" },
                    { label: "Credit Card", value: "Credit Card" },
                  ]}
                  placeholder="Choose method..."
                  className="bg-slate-50 dark:bg-slate-900/50 border-0 rounded-2xl focus:ring-2 focus:ring-rose-500/20"
                />

                <DatePicker
                  label="Spending Date"
                  name={"ex_date"}
                  error={error.ex_date}
                  value={expenseData.ex_date}
                  onChange={inputHandler}
                />

                <Input
                  type="time"
                  label="Transaction Time"
                  name="ex_time"
                  value={expenseData.ex_time}
                  onChange={inputHandler}
                  error={error?.ex_time}
                />
                
                <FileUpload
                  accept={"image/*"}
                  label={"Add Receipt Image"}
                  name={"ex_image"}
                  onChange={inputHandler}
                  error={error.ex_image}
                />
              </div>

              {/* Action Section */}
              <div className="pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/5 rounded-full border border-rose-500/10">
                   <Sparkles size={14} className="text-rose-500" />
                   <span className="text-[9px] font-[1000] text-rose-600 dark:text-rose-400 uppercase tracking-widest">Transaction Verified</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-12 py-4 bg-rose-600 hover:bg-rose-700 text-white font-[1000] rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(225,29,72,0.4)] transition-all flex items-center gap-3 uppercase text-[11px] tracking-[0.2em]"
                >
                  <PlusCircle size={18} /> Record Expense
                </Button>
              </div>
            </form>

            {/* Background Icon Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.06] pointer-events-none transform rotate-12">
               <CreditCard size={180} />
            </div>
          </Card>

          <div className="mt-10 text-center opacity-30">
             <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500 italic">SmartWallet Ledger Protocol v2.0</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpenseCreate;