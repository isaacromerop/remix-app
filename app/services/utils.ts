import { Session, redirect } from "@remix-run/node";

type ResponseAttr<
  TData extends Record<string, unknown> | Array<Record<string, unknown>>
> = {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: TData;
};

type NotificationAttr = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

const NOTIFICATION_KEY = "f4f4f0___1213";

/**
 * Show backend's error message by default, and fallback to a custom error message.
 */
const errorMessage = (error: unknown, fallbackMessage: string): string => {
  if (!isAPIErrorAttr(error)) {
    return fallbackMessage;
  }
  if (error.message instanceof Array && error.message.length > 0) {
    return error.message[0];
  }
  if (typeof error.message === "string") {
    return error.message;
  }
  if (typeof error.error === "string") {
    return error.error;
  }

  return fallbackMessage;
};

const setNotification = (
  session: Session,
  notification: Omit<NotificationAttr, "id">
): void => {
  session.flash(NOTIFICATION_KEY, {
    ...notification,
    id: crypto.randomUUID(),
  });
};

type APIErrorAttr = {
  error: string;
  message: Array<string> | string;
  status: number;
};

const isAPIErrorAttr = (error: unknown): error is APIErrorAttr => {
  return error instanceof Object && "message" in error;
};

const convertToSearchParams = (
  obj: Record<
    string,
    string | number | boolean | Array<string> | null | undefined
  >
): string => {
  const searchParams = new URLSearchParams();

  Object.keys(obj).forEach((key) => {
    const keyValue = obj[key];

    if (typeof keyValue === "number" || typeof keyValue === "boolean") {
      return searchParams.append(key, keyValue.toString());
    }

    if (typeof keyValue === "string") {
      return searchParams.append(key, keyValue);
    }

    if (keyValue instanceof Array) {
      return keyValue.forEach((value) => searchParams.append(key, value));
    }
  });

  return `?${searchParams.toString()}`;
};

const fetchFn = async <TReturnType = void>(
  request: Request
): Promise<TReturnType> => {
  const response = await fetch(request);

  if (!response.ok) {
    const apiError = (await response.json()) as APIErrorAttr;

    const hasToken = request.headers.get("Authorization") !== null;

    if (hasToken && response.status === 401) {
      const session = await sessionStorage.getSession();

      setNotification(session, {
        message: errorMessage(
          apiError,
          "Your session has expired or has been accessed from another device. Log in again"
        ),
        type: "error",
      });

      throw redirect("/sign-in", {
        headers: {
          "Set-Cookie": await sessionStorage.commitSession(session),
        },
      });
    }

    if (hasToken && response.status === 403) {
      if (
        apiError.message === "You are not authorized to perform this action"
      ) {
        return Promise.reject(apiError);
      }

      const session = await sessionStorage.getSession();

      setNotification(session, {
        message: errorMessage(
          apiError,
          "There is an active session in other device. Please sign in again."
        ),
        type: "error",
      });

      throw redirect("/sign-in", {
        headers: {
          "Set-Cookie": await sessionStorage.commitSession(session),
        },
      });
    }

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console -- Improve debugging in development
      console.error(
        `URL:\n${response.url}\n Error:\n${JSON.stringify(apiError)}\n`
      );
    }

    return Promise.reject(apiError);
  }

  return response.json() as Promise<TReturnType>;
};

const api = {
  query: async <TReturnType = void>(config: {
    endpoint: string;
    searchParams?: Parameters<typeof convertToSearchParams>[0];
    accessToken?: string;
  }): Promise<TReturnType> => {
    const request = new Request(
      `${process.env.API_URL}${config.endpoint}${
        config.searchParams ? convertToSearchParams(config.searchParams) : ""
      }`,
      {
        method: "get",
        headers: {
          Accept: "application/vnd.api+json",
        },
      }
    );

    if (config.accessToken) {
      request.headers.set("Authorization", `Bearer ${config.accessToken}`);
    }

    return fetchFn<TReturnType>(request);
  },
  mutation: async <TReturnType = void>(config: {
    endpoint: string;
    method: "post" | "put" | "delete" | "patch";
    body?: Record<string, unknown> | FormData | Array<unknown>;
    accessToken?: string;
  }): Promise<TReturnType> => {
    const request = new Request(`${process.env.API_URL}${config.endpoint}`, {
      body: config.body
        ? config.body instanceof FormData
          ? config.body
          : JSON.stringify(config.body)
        : undefined,
      headers:
        config.body instanceof FormData || config.body === undefined
          ? undefined
          : {
              "Content-Type": "application/json",
            },
      method: config.method,
    });

    if (config.accessToken) {
      request.headers.set("Authorization", `Bearer ${config.accessToken}`);
    }

    return fetchFn<TReturnType>(request);
  },
};

export type { ResponseAttr };
export { api, convertToSearchParams, isAPIErrorAttr, setNotification };
