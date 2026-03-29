import React, { useEffect, useState } from 'react';
import { Api, BASE_URL } from '../../../components/common/Api/api';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, UserCog, ArrowLeft, ShieldCheck, Sparkles, Zap, Crown } from 'lucide-react';
import ThemeToggle from '../../../components/common/ThemeToggle';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center p-4 transition-all duration-700 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-purple-600/20 blur-[150px] rounded-full" />

      <div className="w-full max-w-2xl relative z-10 animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Top Minimal Navigation */}
        <div className="flex justify-between items-center mb-8 px-4">
          <Link to="/admin/dashboard" className="group flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] hover:text-blue-600 transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Hub
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
            <ThemeToggle />
          </div>
        </div>

        {/* --- THE ELITE PROFILE CARD --- */}
        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white dark:border-white/5 relative overflow-hidden group">
          
          {/* Internal Glow Effect */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />

          <div className="p-10 flex flex-col md:flex-row items-center gap-12 relative z-10">
            
            {/* Left: Avatar Section */}
            <div className="relative">
              <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[3rem] shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <div className="h-44 w-44 rounded-[2.6rem] overflow-hidden border-[6px] border-white dark:border-slate-900 shadow-inner">
                  <img 
                    src={`${BASE_URL}/${userData.user_image}`} 
                    className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                    alt="User" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl border-[6px] border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
                <Zap size={14} className="text-white fill-current" />
              </div>
            </div>

            {/* Right: Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Crown className="text-amber-500" size={20} />
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em]">Premium Member</span>
              </div>
              <h1 className="text-5xl font-[1000] text-slate-900 dark:text-white tracking-tighter leading-tight mb-4">
                {userData.name}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400 font-medium mb-8">
                <Mail size={16} className="text-slate-300" />
                {userData.email}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-emerald-500 font-bold text-xs flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified
                  </p>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Role</p>
                  <p className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-8 bg-slate-50/30 dark:bg-white/5 backdrop-blur-md border-t border-white dark:border-white/5">
            <Link 
              to={`/admin/profile/edit/${userData.id}`} 
              className="w-full h-16 bg-slate-900 dark:bg-blue-600 rounded-[2rem] flex items-center justify-center gap-3 text-white font-[1000] uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/30 hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-95 group/btn"
            >
              <UserCog size={18} className="group-hover/btn:rotate-45 transition-transform" />
              Configure Profile Settings
              <Sparkles size={16} className="text-blue-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;