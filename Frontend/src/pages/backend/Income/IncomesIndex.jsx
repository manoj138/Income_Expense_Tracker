import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, handleApiError } from "../../../components/common/Api/api";
import Table from "../../../components/common/Table";
import {
  Trash2,
  Plus,
  ArrowLeft,
  Edit3,
  Eye,
  IndianRupee,
  LayoutGrid,
  Search,
  Filter,
  X,
} from "lucide-react";
import Button from "../../../components/common/Button";
import { useToast } from "../../../components/common/Toast";
import Navbar from "../Navbar";
import Asidebar from "../Asidebar";
import Pagination from "../../../components/common/Pagination";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Input from "../../../components/common/Input";

const IncomesIndex = () => {
  const [incomeData, setIncomeData] = useState([]);
  const { addToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAmounts, setTotalAmounts] = useState();

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

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
        <span className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">
          {val}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "income_amount",
      render: (val) => (
        <span className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 text-lg">
          ₹{Number(val).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Method",
      accessor: "income_method",
      render: (val) => (
        <span className="font-black uppercase text-[10px] text-slate-500">
          {val}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "income_date",
      render: (val) => (
        <span className="font-bold text-slate-600 dark:text-slate-400">
          {val}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "income_id",
      render: (income_id) => (
        <div className="flex gap-2 items-center">
          <Link to={`/admin/income/show/${income_id}`}>
            <div className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 rounded-xl transition-colors">
              <Eye size={18} />
            </div>
          </Link>
          <Link to={`/admin/income/edit/${income_id}`}>
            <div className="p-2 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 rounded-xl transition-colors">
              <Edit3 size={18} />
            </div>
          </Link>
          <button
            onClick={() => setDeleteId(income_id)}
            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 rounded-xl transition-colors"
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
        params: { page, size: pageSize, search, startDate, endDate, status },
      });
      const responseData = res.data.data;
      setTotalAmounts(responseData.totalAmount);
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
      addToast("Record Deleted Successfully", "primary");
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

  // useEffect(() => {
  //   setCurrentPage(1); 
  //   fetchIncome();
  // }, []);

  useEffect(() => {
    fetchIncome(currentPage);
  }, [currentPage, search, startDate, endDate, status]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden font-sans">
      <Asidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/[0.03] dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <Navbar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10">
          {/* Header & Filter Controls Area */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <IndianRupee size={20} className="animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Financial Records
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 dark:text-white tracking-tighter">
                Income <span className="italic text-blue-600">Streams</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              <div className="flex-1 md:w-64">
                <Input
                  icon={Search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Quick Search..."
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-xs font-bold rounded-2xl"
                />
              </div>

              <button
                onClick={() => setOpen(!open)}
                className={`p-3 border rounded-2xl transition-all shadow-sm ${
                  open
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400 hover:text-blue-600"
                }`}
              >
                <Filter size={20} />
              </button>

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
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {/* <Link to="/admin/dashboard" className="hidden md:flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                  <ArrowLeft size={18} /> Back
                </Link> */}
                <Link
                  to="/admin/income/create"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]"
                >
                  <Plus size={18} /> Create New
                </Link>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] border border-white dark:border-white/5 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h2 className="flex items-center gap-3 text-lg font-bold text-slate-800 dark:text-white">
                <LayoutGrid size={20} className="text-blue-600" /> Recent
                Transactions
              </h2>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 
                       bg-emerald-500/10 dark:bg-emerald-500/20 
                        backdrop-blur-xl 
                     border border-emerald-500/20 
                     rounded-2xl shadow-sm"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Total Income
                </span>

                <span className="text-lg font-[1000] text-emerald-600 dark:text-emerald-400">
                  ₹{Number(totalAmounts).toLocaleString()}
                </span>
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-full">
                Total Records: {incomeData.length}
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <Table columns={columns} data={incomeData} hoverable />
            </div>
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
        </main>
      </div>
    </div>
  );
};

export default IncomesIndex;
