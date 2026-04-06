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
     <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[2rem] shadow-xl border border-white dark:border-white/5 relative overflow-hidden group max-w-4xl mx-auto">
  
  {/* Dynamic Background Accents - Smaller Blur */}
  <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/15 transition-all duration-1000" />
  <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/15 transition-all duration-1000" />
  
  <div className="relative z-10 p-6 sm:p-8">
    <div className="flex flex-col md:flex-row items-center gap-8">
      
      {/* Avatar Architecture - Scaled Down */}
      <div className="relative shrink-0">
        <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem] overflow-hidden border-[4px] border-white dark:border-slate-900 bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-all duration-700 shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full">
            <UserCog strokeWidth={1.5} className="text-blue-600 dark:text-blue-400 w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-700 group-hover:rotate-12" />
          </div>
        </div>
        
        {/* Compact Zap Badge */}
        <div className="absolute -bottom-1 -right-1 h-8 w-8 sm:h-10 sm:w-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg border-2 border-slate-50 dark:border-slate-900 flex items-center justify-center">
          <Zap size={14} className="text-amber-500 fill-amber-500" />
        </div>
      </div>

      {/* Profile Narrative - Tightened Layout */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 bg-amber-500/10 rounded-lg">
          <Crown className="text-amber-500" size={12} />
          <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Diamond Elite</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter mb-3 group-hover:text-blue-600 transition-colors">
          {userData.name}
        </h1>

        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
            <Mail size={12} className="text-blue-500" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{userData.email}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
            <Calendar size={12} className="text-emerald-500" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 italic">Since {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Status Grid - Slimmer Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 sm:p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl group/card transition-all">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Status</span>
            </div>
            <p className="text-lg font-black text-emerald-700 dark:text-emerald-300 italic">Verified</p>
          </div>

          <div className="p-3 sm:p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl group/card transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Fingerprint size={14} className="text-blue-600" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Authority</span>
            </div>
            <p className="text-lg font-black text-blue-700 dark:text-blue-300 uppercase leading-none truncate">
              {userData?.status || 'Active'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* --- COMPACT ACTION BAR --- */}
  <div className="px-6 py-6 sm:px-8 bg-slate-50/50 dark:bg-white/5 backdrop-blur-3xl border-t border-slate-100 dark:border-white/5">
    <Link 
      to={`/admin/profile/edit/${userData.id}`} 
      className="group/btn relative w-full h-12 sm:h-14 bg-slate-900 dark:bg-blue-600 rounded-xl flex items-center justify-center gap-3 text-white font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all hover:scale-[1.01]"
    >
      <UserCog size={18} className="relative z-10" />
      <span className="relative z-10">Edit Profile</span>
      <Sparkles size={16} className="relative z-10 text-amber-300" />
    </Link>
    
    <p className="mt-4 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 opacity-60">
      v2.0 &bull; Encryption Active
    </p>
  </div>
</div>
    </div>
  );
};

export default Profile;