import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<TData extends object> = {
  columns: Array<ColumnDef<TData, string>>;
};

const SkeletonTable = <TData extends object>({
  columns,
}: TableProps<TData>) => {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto overflow-y-hidden pr-2">
      <table className="w-full bg-white rounded-xl overflow-hidden">
        <thead className="bg-slate-300 rounded-xl h-9">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="rounded-xl">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left pl-1 text-blue-950">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr className="h-10 bg-white">
            {Array(columns.length)
              .fill(undefined)
              .map((_, index) => (
                <td key={index} className="h-10 pr-4">
                  <div className="h-6 bg-gray-300 rounded-md animate-pulse" />
                </td>
              ))}
            {/* <div className="h-6 w-full bg-gray-500 rounded-md animate-pulse" /> */}
          </tr>
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export { SkeletonTable };
