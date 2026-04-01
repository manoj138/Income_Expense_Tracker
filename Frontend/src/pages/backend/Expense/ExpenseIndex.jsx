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
  IndianRupee,
} from "lucide-react";
import Table from "../../../components/common/Table";
import { useToast } from "../../../components/common/Toast";
import Pagination from "../../../components/common/Pagination";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Input from "../../../components/common/Input";
import PageLoader from "../../../components/common/PageLoader";

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
  const [totalAmounts, setTotalAmounts] = useState(0);
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
        <span className="font-bold uppercase tracking-tight text-slate-700 dark:text-slate-200">
          {val}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "ex_amount",
      render: (val) => (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-[1000] tracking-tighter text-rose-600 dark:text-rose-400">
          <IndianRupee size={14} />
          {Number(val).toLocaleString("en-IN")}
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
      render: (exId) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/expense/show/${exId}`}
            className="rounded-xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/admin/expense/edit/${exId}`}
            className="rounded-xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-400"
            title="Edit Record"
          >
            <Edit3 size={16} />
          </Link>
          <button
            onClick={() => setDeleteId(exId)}
            className="rounded-xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-slate-400"
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
        `/expense?page=${page}&size=${pageSize}&search=${search}&startDate=${startDate}&endDate=${endDate}`
      );
      const responseData = res.data.data;
      setTotalAmounts(responseData.totalAmount || 0);
      setExpense(responseData.items || []);
      setTotalPages(responseData.totalPages || 1);
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

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-rose-600">
            <Receipt size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Expenditure Ledger
            </span>
          </div>
          <h1 className="text-2xl font-[1000] tracking-tighter text-slate-900 sm:text-4xl dark:text-white">
            Expense <span className="italic text-rose-600">Analytics</span>
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:w-auto xl:justify-end">
          <div className="w-full sm:w-48 md:w-64">
            <Input
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="rounded-2xl border-slate-200 bg-white/50 text-xs font-bold dark:border-white/5 dark:bg-slate-900/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className={`rounded-2xl border p-3 shadow-sm transition-all ${
                open
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-slate-200 bg-white text-slate-400 dark:border-white/5 dark:bg-slate-900"
              }`}
            >
              <Filter size={20} />
            </button>

            <Link
              to="/admin/expense/create"
              className="group flex flex-1 items-center justify-center gap-3 rounded-[1.3rem] bg-rose-600 px-6 py-3 text-[11px] font-[1000] uppercase tracking-widest text-white shadow-[0_15px_30px_-10px_rgba(225,29,72,0.4)] transition-all active:scale-95 hover:bg-rose-700 sm:flex-none sm:w-auto"
            >
              <Plus size={18} /> <span className="sm:hidden lg:inline">New Entry</span><span className="hidden sm:inline lg:hidden">Add</span>
            </Link>
          </div>

          {open && (
            <div className="flex w-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white/80 p-3 backdrop-blur-md animate-in fade-in zoom-in duration-300 dark:border-white/10 dark:bg-slate-900/80 sm:w-auto sm:flex-row sm:items-center sm:gap-4 sm:p-2">
              <div className="flex flex-1 items-center gap-2 sm:flex-none">
                <span className="text-[10px] font-black uppercase text-slate-400">From</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent text-[11px] font-bold text-slate-600 outline-none dark:text-slate-300 sm:w-auto"
                />
              </div>
              <div className="h-[1px] w-full bg-slate-200 dark:bg-white/10 sm:h-4 sm:w-[1px]" />
              <div className="flex flex-1 items-center gap-2 sm:flex-none">
                <span className="text-[10px] font-black uppercase text-slate-400">To</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent text-[11px] font-bold text-slate-600 outline-none dark:text-slate-300 sm:w-auto"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="rounded-lg p-1.5 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-white bg-white/70 p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] backdrop-blur-[40px] transition-all duration-500 dark:border-white/5 dark:bg-slate-950/40">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-white/5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Live Transaction Stream
            </span>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 shadow-sm backdrop-blur-xl dark:bg-rose-500/20 sm:flex-initial">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Total
            </span>
            <span className="flex items-center gap-1 text-lg font-[1000] text-rose-600 dark:text-rose-400">
              <IndianRupee size={16} />
              {Number(totalAmounts).toLocaleString("en-IN")}
            </span>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:bg-slate-800 sm:block">
            Records: {expense.length}
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
    </>
  );
};

export default ExpenseIndex;
