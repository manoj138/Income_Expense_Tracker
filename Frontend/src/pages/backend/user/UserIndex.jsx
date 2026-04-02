import React, { useEffect, useState } from "react";
import { Api, handleApiError } from "../../../components/common/Api/api";
import { useToast } from "../../../components/common/Toast";
import Table from "../../../components/common/Table";
import { Mail, ShieldCheck, Trash2, Sparkles, UserCheck, CircleUserRound } from "lucide-react";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import PageLoader from "../../../components/common/PageLoader";

const UserIndex = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/user");
      setUsers(res.data.data);
    } catch (error) {
      handleApiError(error, null, addToast);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!deleteId) return;
    try {
      await Api.delete(`/user/${deleteId}/delete`);
      addToast("User deleted successfully", "success");
      setDeleteId(null);
      fetchUsers();
    } catch (error) {
      handleApiError(error, null, addToast);
    }
  };

  useEffect(() => {
    if (user?.status === "admin") {
      fetchUsers();
    }
  }, []);

  if (user?.status !== "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  const columns = [
    {
      header: "User",
      accessor: "name",
      render: (val, row) => (
        <div className="flex items-center gap-4">
          <div className="relative group">
          <div className="h-12 w-12 rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black group-hover:scale-110 transition-all duration-500 shadow-inner">
            <CircleUserRound size={20} strokeWidth={1.5} />
          </div>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
          </div>
          <div>
            <p className="text-sm font-[1000] text-slate-800 dark:text-white tracking-tight">{val}</p>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">@{row.user_name}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: "email",
      render: (val) => (
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Mail size={14} className="opacity-50" />
          <span className="text-xs font-bold">{val}</span>
        </div>
      ),
    },
    {
      header: "Security Status",
      accessor: "createdAt",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-full flex items-center gap-2">
             <ShieldCheck size={12} className="text-blue-500" />
             <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Active Core</span>
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id) => (
        <button
          onClick={() => setDeleteId(id)}
          className="p-2.5 bg-rose-50 dark:bg-rose-500/5 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <UserCheck size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Identity Management</span>
          </div>
          <h1 className="text-2xl font-[1000] tracking-tighter text-slate-900 sm:text-4xl dark:text-white">
            User <span className="italic text-blue-600">Inventory</span>
          </h1>
        </div>
        <div className="rounded-2xl border border-white bg-white/70 px-4 py-2 text-center shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/40 sm:px-6 sm:py-3">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">Authenticated</p>
            <p className="text-lg font-[1000] text-slate-900 dark:text-white tracking-tighter sm:text-xl">{users.length} <span className="text-[10px] text-blue-500 italic uppercase">Active</span></p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/70 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/5 sm:p-6 lg:p-8">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Identity Stream</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? <PageLoader className="h-[28rem]" /> : <Table columns={columns} data={users} />}
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <PageLoader className="h-40" />
        ) : users.length > 0 ? (
          users.map((u) => (
            <div key={u.id} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <CircleUserRound size={20} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-[1000] text-slate-800 dark:text-white tracking-tight truncate">{u.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 truncate">{u.email}</p>
                </div>
                <button
                  onClick={() => setDeleteId(u.id)}
                  className="p-2 bg-rose-50 dark:bg-rose-500/5 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white/80 p-6 text-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:border-white/20 dark:bg-slate-900/50">
            No users found
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteHandler}
        title="Burn Identity?"
        message="This will permanently revoke all access and erase the user identity from the core database. This action cannot be undone."
      />

      <div className="mt-10 text-center opacity-30">
        <p className="text-[8px] font-black uppercase tracking-[0.8em] text-slate-500 italic">SmartWallet Identity Protocol v2.0</p>
      </div>
    </div>
  );
};

export default UserIndex;
