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
      className={`w-full overflow-x-auto rounded-2xl border border-gray-100 shadow-sm dark:border-slate-800 ${className}`}
    >
      <table className="min-w-full border-collapse text-left whitespace-nowrap" {...props}>
        <thead className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-md sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="border-b border-gray-100 px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:border-slate-800 sm:px-6"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`
                  transition-colors
                  ${hoverable ? "hover:bg-blue-50/30 dark:hover:bg-blue-900/5" : ""}
                  ${striped && rowIdx % 2 !== 0 ? "bg-gray-50/30 dark:bg-gray-800/10" : "bg-white dark:bg-surface-card-dark"}
                `}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 sm:px-6"
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
                className="bg-white px-6 py-12 text-center italic text-gray-400 dark:bg-surface-card-dark"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
