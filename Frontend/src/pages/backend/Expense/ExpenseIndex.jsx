import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, handleApiError } from "../../../components/common/Api/api";
import {
  Trash2,
  Edit3,
  Eye,
  Plus,
  Receipt,
  Sparkles,
  Filter,
  Search,
  X,
} from "lucide-react";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import { useToast } from "../../../components/common/Toast";

// Layout Components
import Asidebar from "../Asidebar";
import Navbar from "../Navbar";
import Pagination from "../../../components/common/Pagination";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Input from "../../../components/common/Input";

const ExpenseIndex = () => {
  const { addToast } = useToast();
  const [expense, setExpense] = useState([]);

  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    const [totalAmounts, setTotalAmounts] = useState();
  

  const pageSize = 10;

  const columns = [
    {
      header: "SR.NO",
      render: (val, index) => (
        <span className="font-black text-slate-400">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      header: "Source",
      accessor: "ex_source",
      render: (val) => (
        <span className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">
          {val}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "ex_amount",
      render: (val) => (
        <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full font-[1000] text-sm tracking-tighter">
          ₹{Number(val).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Method",
      accessor: "ex_method",
      render: (val) => (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {val}
        </span>
      ),
    },
    { header: "Date", accessor: "ex_date" },
    {
      header: "Actions",
      accessor: "ex_id",
      render: (ex_id) => (
        <div className="flex gap-2 items-center">
          <Link
            to={`/admin/expense/show/${ex_id}`}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            title="View Details"
          >
            <Eye size={16} />
          </Link>

          <Link
            to={`/admin/expense/edit/${ex_id}`}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            title="Edit Record"
          >
            <Edit3 size={16} />
          </Link>

          <button
            onClick={() => setDeleteId(ex_id)}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
            title="Delete Record"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const fetchExpense = async (page = 1) => {
    setLoading(true);
    try {
      const res = await Api.get(
        `/expense?page=${page}&size=${pageSize}&search=${search}&startDate=${startDate}&endDate=${endDate}&status=${status}`
      );
      const responseData = res.data.data;
      setTotalAmounts(responseData.totalAmount);

      setExpense(responseData.items);
      setTotalPages(responseData.totalPages);
    } catch (error) {
      handleApiError(error, null, addToast);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!deleteId) return;
    try {
      await Api.delete(`/expense/${deleteId}/delete`);
      setDeleteId(null);
      addToast("Record Deleted Successfully", "success");
      if (expense.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchExpense(currentPage);
      }
    } catch (error) {
      handleApiError(error, null, addToast);
    }
  };

  useEffect(() => {
    fetchExpense(currentPage);
  }, [currentPage, search, startDate, endDate]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden transition-all duration-700">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-rose-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <Navbar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10">
          
          {/* Header & Controls Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-rose-600 mb-2">
                <Receipt size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expenditure Ledger</span>
              </div>
              <h1 className="text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
                Expense <span className="italic text-rose-600">Analytics</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              {/* Search Input */}
              <div className="w-full md:w-64">
                <Input
                  icon={Search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Quick Search..."
                  className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-xs font-bold rounded-2xl"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setOpen(!open)}
                className={`p-3 border rounded-2xl transition-all shadow-sm ${
                  open ? "bg-rose-600 border-rose-600 text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400"
                }`}
              >
                <Filter size={20} />
              </button>

              {/* Date Filter Bar */}
              {open && (
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 border border-slate-200 dark:border-white/10 rounded-2xl animate-in fade-in zoom-in duration-300">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent text-[10px] font-bold outline-none text-slate-600 dark:text-slate-300 px-2"
                  />
                  <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent text-[10px] font-bold outline-none text-slate-600 dark:text-slate-300 px-2"
                  />
                  {(startDate || endDate) && (
                    <button 
                      onClick={() => { setStartDate(""); setEndDate(""); }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}

              {/* Create Button */}
              <Link
                to="/admin/expense/create"
                className="group flex items-center gap-3 px-6 py-3 bg-rose-600 text-white rounded-[1.3rem] font-[1000] shadow-[0_15px_30px_-10px_rgba(225,29,72,0.4)] hover:bg-rose-700 transition-all active:scale-95 uppercase text-[11px] tracking-widest"
              >
                <Plus size={18} /> New Entry
              </Link>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2.5rem] p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Transaction Stream</span>
              </div>
                <div
                className="inline-flex items-center gap-3 px-6 py-3 
                       bg-rose-500/10 dark:bg-rose-500/20 
                        backdrop-blur-xl 
                     border border-rose-500/20 
                     rounded-2xl shadow-sm"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  Total Income
                </span>

                <span className="text-lg font-[1000] text-rose-600 dark:text-rose-400">
                  ₹{Number(totalAmounts).toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] font-black px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full uppercase tracking-tighter">
                Total Records: {expense.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table columns={columns} data={expense} />
            </div>
          </div>

          {!loading && expense.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}

          <ConfirmModal
            isOpen={!!deleteId}
            onClose={() => setDeleteId(null)}
            onConfirm={deleteHandler}
            title="Delete Expense"
            message="Are you sure you want to delete this expense record?"
          />

          <div className="mt-8 text-center opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[0.8em] text-slate-500 italic">
              SmartWallet Security Architecture v2.0
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpenseIndex;