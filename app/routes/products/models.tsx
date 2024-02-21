import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "~/utils/formatters";
import { Form, useNavigation } from "@remix-run/react";
import { Loader, Trash2 } from "lucide-react";

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
  {
    accessorKey: "id",
    header: "",
    cell: (row) => <DeleteButton productId={row.getValue() as string} />,
  },
];

const DeleteButton = ({ productId }: { productId: string }) => {
  const navigation = useNavigation();
  const isDeleting =
    navigation.state === "submitting" &&
    navigation.formData?.get("actionType") === "delete" &&
    navigation.formData.get("productId") === productId;

  return (
    <Form action="/products?index" method="DELETE">
      <input type="hidden" name="actionType" value="delete" />
      <input type="hidden" name="productId" value={productId} />
      <button
        disabled={isDeleting}
        className="bg-red-800 transition text-white w-8 h-8 rounded-full shadow-sm flex justify-center items-center gap-x-2 hover:bg-opacity-90"
      >
        {isDeleting ? <Loader className="animate-spin" /> : <Trash2 />}
      </button>
    </Form>
  );
};

export type { Product };
export { columns };
