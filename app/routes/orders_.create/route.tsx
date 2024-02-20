import { Form, Link } from "@remix-run/react";
import { Input } from "~/components/lib/input";

const NewOrder = () => {
  return (
    <section>
      <h1 className="text-4xl text-blue-950 font-bold">
        <Link to="/orders" className="hover:underline hover:underline-offset-1">
          Orders
        </Link>{" "}
        / Create
      </h1>
      <Form className="bg-white mt-8 max-w-2xl px-4 py-2">
        <fieldset>
          <legend className="text-2xl font-semibold">
            General Information
          </legend>
          <Input name="number" label="Number" />
        </fieldset>
      </Form>
    </section>
  );
};

export default NewOrder;
