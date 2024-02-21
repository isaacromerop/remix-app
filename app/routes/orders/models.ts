import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/utils/formatters";

type Order = {
  id: string;
  number: string;
  customer: string;
  status: string;
  date: string;
};

const columns: Array<ColumnDef<Order>> = [
  {
    accessorKey: "number",
    header: "Order #",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (row) => formatDate(row.renderValue() as string),
  },
];

export type { Order };
export { columns };
