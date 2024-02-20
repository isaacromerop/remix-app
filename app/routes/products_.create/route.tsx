import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { Loader, Save } from "lucide-react";
import { Input } from "~/components/lib/input";
import { createProduct } from "~/services/products";

const NewProduct = () => {
  const navigation = useNavigation();
  const isCreating = navigation.state === "submitting";

  return (
    <section>
      <h1 className="text-4xl text-blue-950 font-bold">
        <Link
          to="/products"
          className="hover:underline hover:underline-offset-1"
        >
          Products
        </Link>{" "}
        / Create
      </h1>
      <Form method="POST" className="bg-white mt-8 max-w-2xl px-4 py-2">
        <fieldset>
          <legend className="text-2xl font-semibold">
            General Information
          </legend>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Input name="sku" label="SKU" required />
            <Input name="name" label="Name" required />
            <Input name="barcode" label="Barcode" required />
            <Input name="price" label="Price" required />
            <Input name="cost" label="Cost" required />
            <Input name="weight" label="Weight" required />
            <Input name="width" label="Width" required />
            <Input name="height" label="Height" required />
            <Input name="length" label="Length" required />
          </div>
        </fieldset>
        <div className="pt-8 h-20">
          <button
            disabled={isCreating}
            className="bg-blue-950 text-white w-full h-full shadow-sm flex justify-center items-center rounded-lg gap-x-2 hover:bg-opacity-90"
          >
            Create Product{" "}
            {isCreating ? <Loader className="animate-spin" /> : <Save />}
          </button>
        </div>
      </Form>
    </section>
  );
};

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const product = Object.fromEntries(formData);

  try {
    await createProduct(process.env.TEMPORARY_TOKEN, product);

    return redirect("/products");
  } catch (error) {
    console.log(error);
  }
};

export { action };
export default NewProduct;
