import React from "react";

const Table = ({
  columns = [],
  data = [],
  className = "",
  hoverable = true,
  striped = false,
  ...props
}) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-[1.75rem] border border-white/80 bg-white/70 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/30 ${className}`}
    >
      <table className="min-w-full border-collapse text-left whitespace-nowrap" {...props}>
        <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md dark:bg-slate-900/90">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="border-b border-slate-100 px-4 py-4 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400 dark:border-slate-800 sm:px-6"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`
                  transition-colors duration-200
                  ${hoverable ? "hover:bg-blue-50/60 dark:hover:bg-blue-500/5" : ""}
                  ${striped && rowIdx % 2 !== 0 ? "bg-slate-50/50 dark:bg-gray-800/10" : "bg-white/60 dark:bg-surface-card-dark/80"}
                `}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-4 text-sm text-slate-600 dark:text-gray-300 sm:px-6"
                  >
                    {col.render
                      ? col.render(row[col.accessor], rowIdx, row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="bg-white/70 px-6 py-14 text-center text-slate-400 dark:bg-surface-card-dark/80"
              >
                <div className="mx-auto max-w-sm">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-300">
                    Empty Ledger
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-400">
                    No data available for the current filters.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
