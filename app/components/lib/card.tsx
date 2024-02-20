import { Disc3, Bomb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type BoxProps = {
  title: string;
  amount: number;
  Icon: LucideIcon;
};

const Card = ({ amount, Icon, title }: BoxProps) => {
  const color =
    amount > 500
      ? "text-green-500"
      : amount > 200
      ? "text-amber-500"
      : "text-red-800";

  return (
    <article className="rounded-xl bg-slate-100 w-72 h-36 p-4 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <p className={`text-2xl font-bold ${color}`}>{amount}</p>
        <div className="bg-white p-2 rounded-full">
          <Icon />
        </div>
      </div>
      <p className="font-semibold">{title}</p>
    </article>
  );
};

const LoadingCard = () => {
  return (
    <article className="rounded-xl bg-slate-100 w-72 h-36 p-4 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-500">-</p>
        <div className="bg-white p-2 rounded-full">
          <Disc3 className="animate-spin" />
        </div>
      </div>
      <p className="font-semibold">
        <span className="bg-gray-300 animate-pulse " />
      </p>
    </article>
  );
};

const ErrorCard = () => {
  return (
    <article className="rounded-xl border border-red-300 bg-slate-100 w-72 h-36 p-4 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-500">-</p>
        <div className="bg-red-200 p-2 rounded-full">
          <Bomb />
        </div>
      </div>
      <p className="font-semibold">Error trying to load info</p>
    </article>
  );
};

export { Card, LoadingCard, ErrorCard };
