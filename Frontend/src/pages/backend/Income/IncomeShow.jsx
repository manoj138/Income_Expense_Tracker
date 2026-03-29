import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api, BASE_URL } from "../../../components/common/Api/api";
import Card from "../../../components/common/Card";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Calendar,
  Clock,
  CreditCard,
  Tag,
  Sparkles,
  Receipt,
  Image as ImageIcon,
  ShieldCheck
} from "lucide-react";
import Asidebar from "../Asidebar";
import Navbar from "../Navbar";

const IncomeShow = () => {
  const { id } = useParams();
  const [income, setIncome] = useState(null); // null ने सुरू करा जेणेकरून लोडिंग स्टेट दाखवता येईल
  const [loading, setLoading] = useState(true);

  const fetchIncome = async () => {
    try {
      const res = await Api.get(`/income/${id}/find`);
      setIncome(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] dark:bg-[#020617]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden transition-all duration-700">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Decorative Glow */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/[0.05] dark:bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Navbar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10 flex flex-col items-center">
          
          <div className="w-full max-w-lg flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <ShieldCheck size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol Secured</span>
              </div>
              <h1 className="text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
                Income <span className="italic text-emerald-600 text-5xl">Receipt</span>
              </h1>
            </div>
            
            <div className="flex gap-3 mb-1">
              <Link
                to="/admin/income"
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm active:scale-90"
              >
                <ArrowLeft size={20} />
              </Link>
              <button 
                onClick={() => window.print()}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm active:scale-90"
              >
                <Printer size={20} />
              </button>
            </div>
          </div>

          <Card className="w-full max-w-lg min-h-fit bg-white/80 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/10 rounded-[3.5rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] relative transition-all duration-500 my-4 print:shadow-none print:my-0">
    
            {/* Cut-out effects */}
            <div className="absolute top-1/2 -left-5 w-10 h-10 bg-[#F8FAFC] dark:bg-[#020617] rounded-full border-r border-white dark:border-white/10 z-10 print:hidden" />
            <div className="absolute top-1/2 -right-5 w-10 h-10 bg-[#F8FAFC] dark:bg-[#020617] rounded-full border-l border-white dark:border-white/10 z-10 print:hidden" />

            {/* Header */}
            <div className="text-center border-b border-dashed border-slate-200 dark:border-white/10 pb-8 mb-8">
                <div className="inline-flex relative mb-6">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                        <Receipt size={32} className="text-emerald-600" strokeWidth={1.5} />
                    </div>
                    <Sparkles className="absolute -top-1 -right-1 text-emerald-400 animate-pulse" size={18} />
                </div>
                <h2 className="text-2xl font-[1000] text-slate-900 dark:text-white tracking-tighter uppercase italic">Transaction Confirmed</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full inline-block tracking-tighter">
                   REF-ID: #{income?.income_id?.toString().padStart(6, '0') || 'N/A'}
                </p>
            </div>

            {/* Amount Section */}
            <div className="space-y-8">
                <div className="relative group overflow-hidden bg-gradient-to-br from-emerald-500/5 to-transparent dark:from-emerald-500/10 dark:to-transparent rounded-[2.5rem] p-8 text-center border border-emerald-500/10 shadow-inner">
                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 italic opacity-70">Amount Credited</p>
                    <h3 className="text-5xl md:text-6xl font-[1000] text-emerald-600 dark:text-emerald-400 tracking-[calc(-0.05em)] tabular-nums">
                        ₹{Number(income?.income_amount || 0).toLocaleString()}
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 px-2">
                    <DetailRow icon={<Tag size={14}/>} label="Source" value={income?.income_source} />
                    <DetailRow icon={<CreditCard size={14}/>} label="Method" value={income?.income_method} isCaps />
                    <DetailRow icon={<Calendar size={14}/>} label="Date" value={income?.income_date} />
                    <DetailRow icon={<Clock size={14}/>} label="Time" value={income?.income_time} />
                </div>
            </div>

            {/* Evidence Image with Fallback */}
            <div className="mt-10 pt-8 border-t border-dashed border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-4">
                    <ImageIcon size={16} className="text-emerald-500" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Evidence</p>
                </div>
                
                {income?.income_image ? (
                  <div className="relative group rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                      <img
                          src={`${BASE_URL}/${income.income_image}`}
                          alt="Income Evidence"
                          className="w-full h-auto max-h-64 object-contain bg-slate-50 dark:bg-slate-900"
                          onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Preview+Available' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5 p-12 text-center">
                      <ImageIcon className="mx-auto text-slate-300 dark:text-slate-700 mb-2" size={30} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Evidence Uploaded</p>
                  </div>
                )}
            </div>

            {/* Verification Footer */}
            <div className="mt-10 text-center border-t border-dashed border-slate-200 dark:border-white/10 pt-8">
                <div className="flex items-center justify-center gap-2 bg-emerald-500/5 dark:bg-emerald-500/10 py-3 rounded-2xl border border-emerald-500/10">
                     <CheckCircle2 size={16} className="text-emerald-500" />
                     <p className="text-[11px] font-[1000] text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] italic">System Verified Record</p>
                </div>
            </div>
          </Card>
          
          <p className="mt-12 text-[10px] font-black text-slate-400/30 uppercase tracking-[1.5em] select-none">Auth Protocol v2.0</p>
        </main>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value, isCaps = false }) => (
  <div className="flex justify-between items-center group py-1">
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 rounded-2xl group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300">
        {icon}
      </div>
      <span className="text-[10px] font-[1000] text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
    <span className={`text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight transition-all group-hover:text-emerald-600 ${isCaps ? 'uppercase tracking-tighter' : ''}`}>
      {value || "---"}
    </span>
  </div>
);

export default IncomeShow;