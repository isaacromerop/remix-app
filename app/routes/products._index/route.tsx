import { PlusCircle } from "lucide-react";
import { Anchor } from "~/components/lib/anchor";
import { Table } from "~/components/lib/table";
import { Product, columns } from "../products/models";
import { deleteProduct, getProducts } from "~/services/products";
import { ActionFunctionArgs, defer, json } from "@remix-run/node";
import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import { SkeletonTable } from "~/components/skeleton-table";
import { ErrorElement } from "~/components/error-element";
import invariant from "tiny-invariant";

const loader = () => {
  const producstPromise = getProducts(process.env.TEMPORARY_TOKEN);

  return defer({ products: producstPromise });
};

const Products = () => {
  const loaderData = useLoaderData<typeof loader>();

  const navigate = useNavigate();

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

                return (
                  <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => navigate(`/products/${row.id}`)}
                    getRowId={getRowId}
                  />
                );
              }}
            </Await>
          </Suspense>
        </div>
      </section>
    </section>
  );
};

const getRowId = (row: Product) => row.id;

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const productId = formData.get("productId")?.toString();

  invariant(productId, "Missing product ID.");

  try {
    await deleteProduct(process.env.TEMPORARY_TOKEN, productId);
  } catch (error) {
    return json({ error });
  }
};

export { action, loader };
export default Products;
