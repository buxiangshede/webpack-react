import { NavLink } from "react-router-dom";

export const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "text-sm font-medium transition-colors",
      isActive
        ? "text-white border-b-2 border-sky-400"
        : "text-slate-200 hover:text-white",
    ].join(" ");
  return (
    <header className="bg-slate-900 px-4 py-3 shadow-sm">
      <nav className="flex gap-6">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </nav>
    </header>
  );
};
