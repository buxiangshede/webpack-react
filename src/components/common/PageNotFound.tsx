import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center gap-4 py-12 text-center">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>
      <p className="text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-md bg-sky-500 px-4 py-2 text-white transition hover:bg-sky-600"
      >
        Back to Home
      </Link>
    </section>
  );
};
