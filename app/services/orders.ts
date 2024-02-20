import { ResponseAttr, api } from "./utils";

const getOrders = async (accessToken: string) => {
  const response = await api.query<
    ResponseAttr<
      Array<{
        type: string;
        id: string;
        attributes: {
          number: string;
          status_text: string;
          shipping: number;
          tax: number;
          discount: number;
          ready_to_ship: number;
          ordered_at: string;
          external_id: number;
          packing_note: string | null;
          tote: string;
          created_at: string;
          updated_at: string;
        };
        relationships: {
          customer: {
            links: {
              related: string;
              self: string;
            };
            data: {
              type: string;
              id: string;
            };
          };
          shipping_contact_information: {
            links: {
              related: string;
              self: string;
            };
            data: {
              type: string;
              id: string;
            };
          };
          billing_contact_information: {
            links: {
              related: string;
              self: string;
            };
            data: {
              type: string;
              id: string;
            };
          };
          order_channel: {
            links: {
              related: string;
              self: string;
            };
            data: {
              type: string;
              id: string;
            };
          };
          order_items: {
            links: {
              related: string;
              self: string;
            };
            data: [
              {
                type: string;
                id: string;
              }
            ];
          };
          shipments: {
            links: {
              related: string;
              self: string;
            };
            data: Array<Record<string, unknown>>;
          };
        };
        links: {
          self: string;
        };
      }>
    >
  >({
    accessToken,
    endpoint: "/orders",
  });

  return response.data;
};

export { getOrders };
