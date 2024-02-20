import { ResponseAttr, api } from "./utils";

const getProducts = async (accessToken: string) => {
  const products = await api.query<
    ResponseAttr<
      Array<{
        type: string;
        id: string;
        attributes: {
          sku: string;
          name: string;
          price: string;
          value: null;
          customs_price: string;
          hs_code: string;
          country_of_origin: null;
          notes: "";
          width: number;
          height: number;
          length: number;
          weight: number;
          barcode: string;
          customs_description: null;
          inventory_sync: number;
          quantity_on_hand: number;
          quantity_allocated: number;
          quantity_available: number;
          quantity_backordered: number;
          created_at: string;
          updated_at: string;
        };
      }>
    >
  >({
    accessToken,
    endpoint: "/products",
  });

  return products.data;
};

const createProduct = async (
  accessToken: string,
  product: Partial<{
    name: string;
    sku: string;
    barcode: string;
    price: string;
    cost: string;
    weight: string;
    width: string;
    height: string;
    length: string;
  }>
) => {
  const formData = new FormData();
  formData.append("_token", accessToken);
  formData.append("customer_id", "XeT9fR2dMluxbF2PJsU4qP2a6HVvc1VVSzqoBc3x");
  formData.append("name", product.name as string);
  formData.append("sku", product.sku as string);
  formData.append("barcode", product.barcode as string);
  formData.append("price", product.price as string);
  formData.append("cost", product.cost as string);
  formData.append("weight", product.weight as string);
  formData.append("width", product.width as string);
  formData.append("height", product.height as string);
  formData.append("length", product.length as string);
  formData.append("reorder_threshold", "0");
  formData.append("customs_price", "1");

  await api.mutation({
    accessToken,
    body: formData,
    method: "post",
    endpoint: "/products",
  });
};

export { getProducts, createProduct };
