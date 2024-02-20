import { Table } from "~/components/lib/table";
import { columns } from "./models";
import { getOrders } from "~/services/orders";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Anchor } from "~/components/lib/anchor";
import { PlusCircle } from "lucide-react";

const loader = async () => {
  const rawOrders = await getOrders(process.env.TEMPORARY_TOKEN);

  const orders = rawOrders.map((order) => ({
    number: order.attributes.number,
    customer: order.relationships.customer.data.type,
    status: order.attributes.status_text,
    date: order.attributes.ordered_at,
  }));

  return json({ orders });
};

const Orders = () => {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <section>
      <h1 className="text-4xl text-blue-950 font-bold">Orders</h1>
      <section className="mt-8">
        <div className="w-48 h-10">
          <Anchor to="/orders/create">
            <PlusCircle /> Create Order
          </Anchor>
        </div>
        <div className="pt-4">
          <Table data={loaderData.orders} columns={columns} />
        </div>
      </section>
    </section>
  );
};

export { loader };
export default Orders;
