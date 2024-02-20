import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  Box,
  CheckCircle,
  ShoppingCart,
  XCircle,
} from "lucide-react";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns: Array<ColumnDef<Person>> = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "visits",
    header: "Visits",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => row.renderValue(),
  },
  {
    accessorKey: "progress",
    header: "Progess",
    cell: (row) => row.renderValue(),
  },
];

const Cards = [
  {
    Icon: Box,
    amount: 1000,
    title: "Products",
  },
  {
    Icon: ShoppingCart,
    amount: 450,
    title: "Orders",
  },
  {
    Icon: XCircle,
    amount: 100,
    title: "Cancelled",
  },
  {
    Icon: AlertCircle,
    amount: 801,
    title: "Follow Up",
  },
  {
    Icon: CheckCircle,
    amount: 649,
    title: "Delivered",
  },
];

export { Cards, columns, defaultData };
