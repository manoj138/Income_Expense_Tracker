import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, handleApiError } from "../../../components/common/Api/api";
import Table from "../../../components/common/Table";
import { formatDateString } from "../../../utils/formatDate";
import {
  Trash2,
  Plus,
  Edit3,
  Eye,
  IndianRupee,
  LayoutGrid,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useToast } from "../../../components/common/Toast";
import Pagination from "../../../components/common/Pagination";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Input from "../../../components/common/Input";
import PageLoader from "../../../components/common/PageLoader";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const IncomesIndex = () => {
  const [incomeData, setIncomeData] = useState([]);
  const { addToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAmounts, setTotalAmounts] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const pageSize = 10;

  const columns = [
    {
      header: "Sr.no",
      render: (val, index) => (
        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      header: "Source",
      accessor: "income_source",
      render: (val) => (
        <span className="font-bold uppercase tracking-tight text-slate-700 dark:text-slate-200">
          {val}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "income_amount",
      render: (val) => (
        <span className="flex items-center gap-1 text-lg font-black text-emerald-600 dark:text-emerald-400">
          <IndianRupee size={16} />
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      header: "Method",
      accessor: "income_method",
      render: (val) => (
        <span className="text-[10px] font-black uppercase text-slate-500">
          {val}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "income_date",
      render: (val) => (
        <span className="font-bold text-slate-600 dark:text-slate-400">
          {formatDateString(val)}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "income_id",
      render: (incomeId) => (
      <div className="flex gap-2">
        <Link to={`/admin/income/show/${incomeId}`} className="rounded-2xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400">
          <Eye size={18} />
        </Link>
        <Link to={`/admin/income/edit/${incomeId}`} className="rounded-2xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-amber-500 hover:text-white dark:bg-slate-800 dark:text-slate-400">
          <Edit3 size={18} />
        </Link>
        <button
          onClick={() => setDeleteId(incomeId)}
          className="rounded-2xl bg-slate-100 p-2 text-slate-600 shadow-sm transition-all hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-slate-400"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
    },
  ];

  const fetchIncome = async (page = 1) => {
    setLoading(true);
    try {
    const res = await Api.get("/income", {
      params: { page, size: pageSize, search, startDate, endDate },
    });
      const responseData = res.data.data;
      setTotalAmounts(responseData.totalAmount || 0);
      setIncomeData(responseData.items || []);
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
      await Api.delete(`/income/${deleteId}/delete`);
      setDeleteId(null);
      addToast("Record Deleted Successfully", "success");
      const nextPage =
        incomeData.length === 1 && currentPage > 1
          ? currentPage - 1
          : currentPage;
      setCurrentPage(nextPage);
      fetchIncome(nextPage);
    } catch (error) {
      handleApiError(error, null, addToast);
    }
  };

  useEffect(() => {
    fetchIncome(currentPage);
  }, [currentPage, search, startDate, endDate, status]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3 text-blue-600">
            <IndianRupee size={20} className="animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Financial Records
            </span>
          </div>
          <h1 className="text-2xl font-[1000] tracking-tighter text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Income <span className="italic text-blue-600">Streams</span>
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:w-auto xl:justify-end">
          <div className="w-full sm:w-48 md:w-64">
            <Input
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="rounded-2xl border-slate-200 bg-white text-xs font-bold dark:border-white/5 dark:bg-slate-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className={`rounded-2xl border p-3 shadow-sm transition-all ${
                open
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-400 hover:text-blue-600 dark:border-white/5 dark:bg-slate-900"
              }`}
            >
              <Filter size={20} />
            </button>

            <Link
              to="/admin/income/create"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 sm:flex-none"
            >
              <Plus size={18} /> <span className="sm:hidden lg:inline">Create New</span><span className="hidden sm:inline lg:hidden">Add</span>
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

      <div className="hidden md:block overflow-hidden rounded-[2.5rem] border border-white bg-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] backdrop-blur-[40px] dark:border-white/5 dark:bg-slate-900/40">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-white/5 sm:p-6 lg:flex-row lg:items-center lg:justify-between xl:p-8">
          <h2 className="flex items-center gap-3 text-lg font-bold text-slate-800 dark:text-white">
            <LayoutGrid size={20} className="text-blue-600" /> Recent Transactions
          </h2>
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 shadow-sm backdrop-blur-xl dark:bg-emerald-500/20 sm:flex-initial">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Total
            </span>
            <span className="flex items-center gap-1 text-lg font-[1000] text-emerald-600 dark:text-emerald-400">
              <IndianRupee size={16} />
              {Number(totalAmounts).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="hidden rounded-full bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:bg-slate-800/50 sm:block">
            Records: {incomeData.length}
          </div>
        </div>
        <div className="p-4">
          <Table columns={columns} data={incomeData} hoverable />
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-[2rem] p-1 md:hidden">
        {incomeData.length > 0 ? (
          incomeData.map((item) => (
            <div
              key={item.income_id}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    Source
                  </p>
                  <p className="text-sm font-[1000] text-slate-900 dark:text-white">{item.income_source}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-black text-emerald-600 dark:text-emerald-300">
                  <IndianRupee size={14} />
                  {formatCurrency(item.income_amount)}
                </span>
              </div>
                <div className="mt-3 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                  <span>{formatDateString(item.income_date)}</span>
                <span className="text-[10px] font-bold tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  {item.income_method}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <Link
                  to={`/admin/income/show/${item.income_id}`}
                  className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-50 dark:border-white/10 dark:text-blue-300"
                >
                  Details
                </Link>
                <Link
                  to={`/admin/income/edit/${item.income_id}`}
                  className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 hover:bg-amber-50 dark:border-white/10 dark:text-amber-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(item.income_id)}
                  className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 hover:bg-rose-50 dark:border-white/10 dark:text-rose-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white/80 p-4 text-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:border-white/20 dark:bg-slate-900/50 dark:text-slate-500">
            No records yet
          </div>
        )}
      </div>

      {!loading && incomeData.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteHandler}
        title="Delete Income"
        message="Are you sure you want to delete this income record?"
      />

      <div className="mt-10 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">
          Secure Financial Ledger Protocol v2.0
        </p>
      </div>
    </>
  );
};

export default IncomesIndex;
