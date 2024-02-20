const ErrorElement = () => {
  return (
    <article className="flex items-center justify-center min-h-screen from-gray-800 via-greeen-300 to-blue-500 bg-gradient-to-br">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
        Oops!
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl">
        We had some issues loading your data
      </p>
      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        Try again later .{" "}
      </p>
    </article>
  );
};

export { ErrorElement };
