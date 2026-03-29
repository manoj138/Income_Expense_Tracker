import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Api, BASE_URL } from '../../../components/common/Api/api';
import Card from '../../../components/common/Card';
import { ArrowLeft, Receipt, Image as ImageIcon, CheckCircle2, Sparkles, FileText, Tag, CreditCard, Calendar, Clock } from 'lucide-react';

import Asidebar from "../Asidebar";
import Navbar from "../Navbar";

const ExpenseShow = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState({});

  const fetchExpense = async () => {
    try {
      const res = await Api.get(`/expense/${id}/find`);
      setExpense(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden transition-all duration-700">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Decorative Glows */}
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-rose-500/[0.05] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-amber-500/[0.05] blur-[80px] rounded-full pointer-events-none" />

        <Navbar />

        {/* मुख्य बदल: इथे pb-20 दिला आहे जेणेकरून कार्ड खाली टेकणार नाही */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10 flex flex-col items-center pb-20">
          
          {/* Page Header */}
          <div className="w-full max-w-lg flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 text-rose-600 mb-2">
                <FileText size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Audit Protocol</span>
              </div>
              <h1 className="text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
                Expense <span className="italic text-rose-600 text-5xl">Voucher</span>
              </h1>
            </div>
            
            <Link to="/admin/expense" className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">
              <ArrowLeft size={18} /> 
              <span className="text-[10px] uppercase tracking-widest">Back</span>
            </Link>
          </div>

          {/* Premium Glassmorphism Receipt Card */}
          {/* बदल: overflow-hidden काढून टाकला आणि min-h-fit दिला */}
          <Card className="w-full max-w-lg min-h-fit bg-white/80 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[3.5rem] p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative transition-all duration-500 mb-10">
            
            {/* Decorative Receipt Notches - यांना z-10 दिला आहे */}
            <div className="absolute top-1/2 -left-5 w-10 h-10 bg-[#F8FAFC] dark:bg-[#020617] rounded-full z-10" />
            <div className="absolute top-1/2 -right-5 w-10 h-10 bg-[#F8FAFC] dark:bg-[#020617] rounded-full z-10" />

            {/* Header Section */}
            <div className="text-center border-b border-dashed border-slate-200 dark:border-white/10 pb-8 mb-8">
              <div className="inline-flex relative mb-4">
                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center">
                   <Receipt size={32} className="text-rose-500" strokeWidth={1.5} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 text-amber-400" size={16} />
              </div>
              <h2 className="text-2xl font-[1000] text-slate-900 dark:text-white tracking-tighter uppercase italic">Transaction Details</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full inline-block">Auth Code: #{expense.ex_id || 'AUDIT_LGR'}</p>
            </div>

            {/* Financial Body */}
            <div className="space-y-8">
              <div className="bg-rose-500/5 dark:bg-rose-500/10 rounded-[2.5rem] p-8 text-center border border-rose-500/10">
                <p className="text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2 italic text-center w-full block">Settled Amount</p>
                <h3 className="text-5xl md:text-6xl font-[1000] text-rose-600 dark:text-rose-400 tracking-tighter tabular-nums drop-shadow-lg">
                  ₹{Number(expense.ex_amount).toLocaleString()}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 px-2">
                <DataRow icon={<Tag size={14}/>} label="Expenditure Source" value={expense.ex_source} />
                <DataRow icon={<CreditCard size={14}/>} label="Settlement Method" value={expense.ex_method} isCaps />
                <DataRow icon={<Calendar size={14}/>} label="Logged Date" value={expense.ex_date} />
                <DataRow icon={<Clock size={14}/>} label="Logged Time" value={expense.ex_time} />
              </div>
            </div>

            {/* Digital Evidence (Image) */}
            {expense?.ex_image && (
              <div className="mt-12 pt-10 border-t border-dashed border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon size={16} className="text-rose-500" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Audit Evidence</p>
                </div>
                <div className="group relative rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl transition-transform hover:scale-[1.02]">
                  <img
                    src={`${BASE_URL}/${expense.ex_image}`}
                    alt="Evidence"
                    className="w-full h-auto max-h-64 object-contain bg-slate-50 dark:bg-slate-900 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <span className="text-white text-[9px] font-black uppercase tracking-widest border border-white/40 px-4 py-2 rounded-full">View Document</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 text-center border-t border-dashed border-slate-200 dark:border-white/10 pt-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                 <CheckCircle2 size={14} className="text-emerald-500" />
                 <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] italic">Secure Ledger Verified</p>
              </div>
              <div className="text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest italic">SmartWallet Security Architecture v2.0</div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

// सुधारित DataRow Helper
const DataRow = ({ icon, label, value, isCaps = false }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
      <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl group-hover:text-rose-500 transition-colors">
        {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className={`text-sm font-[1000] text-slate-800 dark:text-slate-100 tracking-tight ${isCaps ? 'uppercase' : ''}`}>
      {value || "---"}
    </span>
  </div>
);

export default ExpenseShow;