import { ResponseAttr, api } from "./utils";

const getUser = async (accessToken?: string) => {
  const user = await api.query<
    ResponseAttr<
      Array<{
        type: string;
        id: string;
        attributes: {
          created_at: string;
          updated_at: string;
        };
      }>
    >
  >({
    accessToken,
    endpoint: "/users/me",
  });

  const data = setTimeout(() => {
    return user.data;
  }, 5000);

  return data;
};

export { getUser };
