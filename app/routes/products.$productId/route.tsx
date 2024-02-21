import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { Loader, Save } from "lucide-react";
import invariant from "tiny-invariant";
import { Input } from "~/components/lib/input";
import { getProduct, updateProduct } from "~/services/products";

const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing productId.");

  const product = await getProduct(
    process.env.TEMPORARY_TOKEN,
    params.productId
  );

  return json({ product });
};

const Product = () => {
  const loaderData = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isUpdating = navigation.state === "submitting";

  return (
    <section>
      <h1 className="text-4xl text-blue-950 font-bold">
        <Link
          to="/products"
          className="hover:underline hover:underline-offset-1"
        >
          Products
        </Link>{" "}
        / {`${loaderData.product.attributes.name}`}
      </h1>
      <div className="bg-white mt-8 max-w-2xl px-4 py-2">
        <Form method="PATCH">
          <fieldset>
            <legend className="text-2xl font-semibold">
              General Information
            </legend>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <input
                type="hidden"
                name="memberId"
                value={loaderData.product.id}
              />
              <Input
                name="sku"
                label="SKU"
                required
                defaultValue={loaderData.product.attributes.sku}
              />
              <Input
                name="name"
                label="Name"
                required
                defaultValue={loaderData.product.attributes.name}
              />
              <Input
                name="barcode"
                label="Barcode"
                required
                defaultValue={loaderData.product.attributes.barcode}
              />
              <Input
                name="price"
                label="Price"
                required
                defaultValue={loaderData.product.attributes.price}
              />
              <Input
                name="weight"
                label="Weight"
                required
                defaultValue={loaderData.product.attributes.weight}
              />
              <Input
                name="width"
                label="Width"
                required
                defaultValue={loaderData.product.attributes.width}
              />
              <Input
                name="height"
                label="Height"
                required
                defaultValue={loaderData.product.attributes.height}
              />
              <Input
                name="length"
                label="Length"
                required
                defaultValue={loaderData.product.attributes.length}
              />
            </div>
          </fieldset>
          <div className="pt-8 h-20">
            <button
              disabled={isUpdating}
              className="bg-blue-950 transition text-white w-full h-full shadow-sm flex justify-center items-center rounded-lg gap-x-2 hover:bg-opacity-90"
            >
              Update Product{" "}
              {isUpdating ? <Loader className="animate-spin" /> : <Save />}
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.productId, "Missing param productId.");

  const formData = await request.formData();

  const product = Object.fromEntries(formData);

  try {
    await updateProduct(process.env.TEMPORARY_TOKEN, params.productId, product);

    return redirect("/products");
  } catch (error) {
    return json({ error });
  }
};

export { action, loader };
export default Product;
