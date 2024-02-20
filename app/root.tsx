import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import {
  LayoutDashboard,
  ListChecks,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";
import stylesheet from "~/tailwind.css";

const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const Views = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    to: "/products",
    icon: ListChecks,
  },
  {
    label: "Orders",
    to: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Error Page",
    to: "/error-page",
    icon: XCircle,
  },
];

export default function App() {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      loadingBarRef.current?.continuousStart();
    }
    if (navigation.state === "idle") {
      loadingBarRef.current?.complete();
    }
  }, [navigation.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen">
        <LoadingBar ref={loadingBarRef} />
        <aside className="bg-blue-950 min-w-64">
          <ul className="flex flex-col gap-y-4 mt-8">
            {Views.map(({ icon: Icon, label, to }) => (
              <li key={label} className="h-12 w-full">
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-slate-200 text-blue-950" : "text-slate-100"
                    } inline-block h-full w-full rounded-l-2xl transition`
                  }
                  to={to}
                >
                  <div className="ml-5 h-full flex gap-x-2 bg-inherit justify-start items-center">
                    <Icon />
                    {label}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <main
          className={`bg-slate-200 w-full pl-8 py-8 overflow-y-auto ${
            ""
            // navigation.state === "loading"
            //   ? "opacity-25 transition-opacity"
            //   : ""
          }`}
        >
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const ErrorBoundary = () => {
  const error = useRouteError();

  const isRouteError = isRouteErrorResponse(error);

  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full antialiased">
        <main className="grid min-h-full place-items-center bg-gray-900 bg-cover bg-no-repeat px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-bold text-sky-400">
              {isRouteError ? "404" : "500"}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-50 sm:text-5xl">
              {isRouteError ? "Page not found" : "Unexpected error"}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-300">
              Sorry,{" "}
              {isRouteError
                ? "we couldn't find the page you're looking for."
                : "something went wrong on our servers."}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                reloadDocument
                className="bg-slate-400 py-2 px-4 rounded-md hover:bg-opacity-75"
              >
                Go back home
              </Link>
              <a
                href="mailto:some-email@gmail.com"
                className="text-sm font-bold text-gray-50"
              >
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export { links, meta, ErrorBoundary };
