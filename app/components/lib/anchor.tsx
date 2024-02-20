import { Link } from "@remix-run/react";
import React from "react";

type AnchorProps = {
  children: React.ReactNode;
  to: string;
};

const Anchor = ({ children, to }: AnchorProps) => {
  return (
    <Link
      to={to}
      className="bg-blue-950 text-white w-full h-full shadow-sm flex justify-center items-center rounded-lg gap-x-2 hover:bg-opacity-90"
    >
      {children}
    </Link>
  );
};

export { Anchor };
