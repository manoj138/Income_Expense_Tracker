import React, { useState, useEffect } from "react";
import { Api } from "../../../components/common/Api/api";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../components/common/Toast";
import { ArrowLeft, Save, Fingerprint, User, Mail } from "lucide-react";
const ProfileEdit = () => {
  const { addToast } = useToast();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${id}/find`);
      setUser(res.data.data);
    } catch (error) { console.log(error); }
  };

  const inputHandler = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`/user/${id}/update`, user);
      addToast('Identity Updated!', 'success');
      navigate("/admin/profile");
    } catch (error) { 
        addToast('Update Failed', 'error');
    }
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-start p-4 md:p-6 transition-all duration-700">
      {/* --- Symmetric Header Layout --- */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 relative z-10 animate-in fade-in slide-in-from-top-4 duration-700 pt-4 md:pt-10">
        {/* Left Side: Back Button */}
        <Link 
          to="/admin/profile" 
          className="group flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </Link>
      </div>

      {/* --- CENTERED FORM CARD --- */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700 pb-8">
        <form onSubmit={submitHandler} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white dark:border-white/5 overflow-hidden">
          
          <div className="p-8 relative">
            {/* Form Header with Mini Identity Avatar */}
            <div className="flex flex-col items-center text-center mb-8">
               <div className="relative group/avatar mb-4">
                  <div className="p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[1.8rem] shadow-xl">
                    <div className="h-20 w-20 rounded-[1.5rem] overflow-hidden border-[3px] border-white dark:border-slate-900 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-2xl font-black text-blue-600 transition-transform group-hover/avatar:scale-105 duration-500">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
               </div>
               <h2 className="text-2xl font-[1000] text-slate-900 dark:text-white tracking-tighter uppercase italic">Update Identity</h2>
               <div className="mt-1 h-1 w-12 bg-blue-500/20 rounded-full mx-auto" />
            </div>

            {/* Inputs Section */}
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute left-5 top-[34px] text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={16} />
                </div>
                <Input 
                  label={"FULL IDENTITY NAME"} 
                  name={"name"} 
                  value={user.name || ""} 
                  onChange={inputHandler}
                  className="!rounded-2xl !py-3.5 !pl-12 !pr-4 border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 focus:ring-4 focus:ring-blue-500/10 font-bold text-xs dark:text-white transition-all placeholder:text-slate-400" 
                />
              </div>

              <div className="relative group">
                <div className="absolute left-5 top-[34px] text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={16} />
                </div>
                <Input 
                  label={"RECOVERY EMAIL"} 
                  name={"email"} 
                  value={user.email || ""} 
                  onChange={inputHandler} 
                  type="email"
                  className="!rounded-2xl !py-3.5 !pl-12 !pr-4 border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 focus:ring-4 focus:ring-blue-500/10 font-bold text-xs dark:text-white transition-all placeholder:text-slate-400" 
                />
              </div>

            </div>
          </div>

          {/* Action Button Section */}
          <div className="p-8 bg-slate-50/30 dark:bg-white/5 backdrop-blur-md border-t border-white dark:border-white/5">
            <Button 
              type="submit" 
              className="w-full h-16 bg-slate-900 dark:bg-blue-600 rounded-[1.8rem] flex items-center justify-center gap-3 text-white font-[1000] uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-blue-500/20 hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-[0.96] group/btn"
            >
              <Fingerprint size={18} className="group-hover/btn:rotate-12 transition-transform" />
              Commit Updates
              <Save size={14} className="text-blue-300" />
            </Button>
            <div className="mt-6 flex justify-center items-center gap-3 text-slate-300 dark:text-slate-700">
               <div className="h-px w-6 bg-current" />
               <span className="text-[8px] font-black uppercase tracking-widest">End-to-End Secure</span>
               <div className="h-px w-6 bg-current" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
