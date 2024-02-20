import { Card, ErrorCard, LoadingCard } from "~/components/lib/card";
import { Table } from "~/components/lib/table";
import { Cards, columns, defaultData } from "./models";
import { defer } from "@remix-run/node";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import { ShieldAlert } from "lucide-react";
import { getUser } from "~/services/user";

const loader = () => {
  const user = getUser();

  return defer({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <section style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-4xl text-blue-950 font-bold">Dashboard</h1>
      <section className="mt-8 grid grid-cols-3 gap-3">
        {Cards.map((card, index) => (
          <Card
            key={`${card.title}-${index}`}
            Icon={card.Icon}
            amount={card.amount}
            title={card.title}
          />
        ))}
        <Suspense fallback={<LoadingCard />}>
          <Await resolve={user} errorElement={<ErrorCard />}>
            <Card Icon={ShieldAlert} amount={869} title="Error" />
          </Await>
        </Suspense>
      </section>
      <section className="pt-4">
        <p className="text-2xl font-bold py-4">Customers</p>
        <Table data={defaultData} columns={columns} />
      </section>
    </section>
  );
}

export { loader };
