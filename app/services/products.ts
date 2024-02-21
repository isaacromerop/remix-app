import { CursorAttr, ResponseAttr, api } from "./utils";

const getProducts = async (accessToken: string) => {
  const products = await api.query<
    CursorAttr<
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

//The body should be abstracted in a type. Won't do it since is a test.
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
  const body = {
    data: {
      type: "products",
      attributes: {
        sku: product.sku,
        name: product.name,
        price: product.price,
        notes: "product notes",
        width: product.width,
        height: product.height,
        length: product.length,
        weight: product.weight,
        barcode: product.barcode,
        value: 15,
        customs_price: 20,
        customs_description: "test product",
        hs_code: "HS1111",
        country_of_origin: "US",
      },
      relationships: {
        customer: {
          data: {
            type: "customers",
            id: "15",
          },
        },
      },
    },
  };

  await api.mutation({
    accessToken,
    body,
    method: "post",
    endpoint: "/products",
  });
};

const getProduct = async (accessToken: string, productId: string) => {
  const product = await api.query<
    ResponseAttr<{
      sku: string;
      name: string;
      price: string;
      value: string | null;
      customs_price: string;
      hs_code: string;
      country_of_origin: string | null;
      notes: string;
      width: number;
      height: number;
      length: number;
      weight: number;
      barcode: string;
      customs_description: string | null;
      inventory_sync: number;
      quantity_on_hand: number;
      quantity_allocated: number;
      quantity_available: number;
      quantity_backordered: number;
      created_at: string;
      updated_at: string;
    }>
  >({
    accessToken,
    endpoint: `/products/${productId}`,
  });

  return product.data;
};

//The body should be abstracted in a type. Won't do it since is a test.
const updateProduct = async (
  accessToken: string,
  productId: string,
  product: Partial<{
    actionType: string;
    memberId: string;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { memberId, actionType, ...formBody } = product;

  const body = {
    data: {
      type: "products",
      id: memberId,
      attributes: formBody,
      relationships: {
        customer: {
          data: {
            type: "customers",
            id: "15",
          },
        },
      },
    },
  };

  await api.mutation({
    accessToken,
    body,
    method: "patch",
    endpoint: `/products/${productId}`,
  });
};

const deleteProduct = async (accessToken: string, productId: string) => {
  await api.mutation({
    accessToken,
    method: "delete",
    endpoint: `/products/${productId}`,
  });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
