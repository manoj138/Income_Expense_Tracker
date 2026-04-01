import React, { useEffect, useState } from 'react';
import { Api } from '../../../components/common/Api/api';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  UserCog, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Crown,
  Calendar,
  Fingerprint
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) { 
      console.log(error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchUser(); 
  }, []);

  if (loading) return null;

  return (
    <div className="w-full flex flex-col items-center py-6 sm:py-12 px-4 transition-all duration-700 font-sans">
      
      {/* Top Header Section */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-10 px-2 sm:px-6">
        <Link 
          to="/admin/dashboard" 
          className="group flex items-center gap-2.5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] hover:text-blue-600 transition-all"
        >
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10 transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          </div>
          <span className="hidden sm:inline">Back to Hub</span>
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 dark:bg-blue-500/10 rounded-full border border-blue-500/10">
          <Fingerprint size={14} className="text-blue-500" />
          <span className="text-[9px] font-[1000] text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em]">Identity Verified</span>
        </div>
      </div>

      {/* --- THE MASTER PROFILE CARD --- */}
      <div className="w-full max-w-3xl bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[2.5rem] sm:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(37,99,235,0.12)] border border-white dark:border-white/5 relative overflow-hidden group">
        
        {/* Dynamic Background Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/15 transition-all duration-1000" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/15 transition-all duration-1000" />
        
        <div className="relative z-10 p-8 sm:p-14">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            
            {/* Avatar Architecture */}
            <div className="relative shrink-0 perspective-1000">
                <div className="h-40 w-40 sm:h-52 sm:w-52 rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border-[6px] sm:border-[10px] border-white dark:border-slate-900 bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-all duration-700 shadow-2xl relative">
                   {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-full border border-blue-500/5 backdrop-blur-sm">
                    <UserCog 
                        strokeWidth={1.5}
                        className="text-blue-600 dark:text-blue-400 w-16 h-16 sm:w-24 sm:h-24 transition-transform duration-700 group-hover:rotate-12" 
                    />
                  </div>
                </div>
              
              {/* Floating Zap Badge */}
              <div className="absolute -bottom-2 -right-2 h-10 w-10 sm:h-14 sm:w-14 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border-4 sm:border-8 border-slate-50 dark:border-slate-900 flex items-center justify-center animate-bounce-slow">
                <Zap size={16} className="text-amber-500 fill-amber-500 sm:size-20" />
              </div>
            </div>

            {/* Profile Narrative Section */}
            <div className="flex-1 text-center md:text-left pt-2">
              <div className="inline-flex items-center gap-2.5 px-4 lg:px-0 py-2 sm:mb-4">
                <div className="p-1.5 bg-amber-500/10 rounded-lg">
                  <Crown className="text-amber-500" size={16} />
                </div>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.4em]">Diamond Elite Tier</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-[1000] text-slate-900 dark:text-white tracking-tighter leading-tight mb-4 group-hover:text-blue-600 transition-colors duration-500">
                {userData.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 transition-all hover:border-blue-500/20">
                  <Mail size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                  <Calendar size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 italic">Member Since {new Date().getFullYear()}</span>
                </div>
              </div>

              {/* Status Grid Engineering */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] group/card transition-all hover:bg-emerald-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-600">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Global Status</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-[1000] text-emerald-700 dark:text-emerald-300 tracking-tighter italic">Verified</p>
                </div>

                <div className="p-5 sm:p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2rem] group/card transition-all hover:bg-blue-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-600">
                      <Fingerprint size={16} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Authority</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-[1000] text-blue-700 dark:text-blue-300 tracking-tighter uppercase leading-none">
                    {userData?.status || 'Active User'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PREMIUM ACTION BAR --- */}
        <div className="px-8 py-8 sm:px-14 sm:py-10 bg-slate-50/50 dark:bg-white/5 backdrop-blur-3xl border-t border-slate-100 dark:border-white/5">
          <Link 
            to={`/admin/profile/edit/${userData.id}`} 
            className="group/btn relative w-full h-16 sm:h-20 bg-slate-900 dark:bg-blue-600 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center gap-4 text-white font-[1000] uppercase tracking-[0.2em] text-xs sm:text-sm shadow-2xl shadow-blue-500/30 overflow-hidden transition-all hover:scale-[1.01] active:scale-95"
          >
            {/* Animated Flare Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <UserCog size={22} className="relative z-10 group-hover/btn:rotate-90 transition-transform duration-500" />
            <span className="relative z-10">Configure Ledger Profile</span>
            <Sparkles size={18} className="relative z-10 text-amber-300 animate-pulse" />
          </Link>
          
          <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 italic opacity-50">
            SmartWallet Architecture v2.0 &bull; Encryption Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;