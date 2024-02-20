import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/utils/formatters";

type Product = {
  id: string;
  name: string;
  price: string;
  created_at: string;
  inventory_sync: number;
};

const columns: Array<ColumnDef<Product>> = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "inventory_sync",
    header: "Quantity",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: (row) => formatDate(row.renderValue() as string),
  },
];

export type { Product };
export { columns };
