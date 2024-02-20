import { PlusCircle } from "lucide-react";
import { Anchor } from "~/components/lib/anchor";
import { Table } from "~/components/lib/table";
import { columns } from "./models";
import { getProducts } from "~/services/products";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { SkeletonTable } from "~/components/skeleton-table";
import { ErrorElement } from "~/components/error-element";

const loader = () => {
  const producstPromise = getProducts(process.env.TEMPORARY_TOKEN);

  return defer({ products: producstPromise });
};

const Products = () => {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <section>
      <h1 className="text-4xl text-blue-950 font-bold">Products</h1>
      <section className="mt-8">
        <div className="w-48 h-10">
          <Anchor to="/products/create">
            <PlusCircle /> Create Product
          </Anchor>
        </div>
        <div className="pt-4">
          <Suspense fallback={<SkeletonTable columns={columns} />}>
            <Await
              resolve={loaderData.products}
              errorElement={<ErrorElement />}
            >
              {(products) => {
                const data = products.map((product) => ({
                  id: product.id,
                  name: product.attributes.name,
                  price: product.attributes.price,
                  created_at: product.attributes.created_at,
                  inventory_sync: product.attributes.inventory_sync,
                }));

                return <Table columns={columns} data={data} />;
              }}
            </Await>
          </Suspense>
        </div>
      </section>
    </section>
  );
};

export { loader };
export default Products;
