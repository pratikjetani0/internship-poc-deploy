import { BarChart2, LayoutDashboard, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-white dark:bg-[#0f0f0f] border-r border-slate-200 dark:border-white/10 flex flex-col z-40 p-5 gap-6 transition-colors duration-300">
      <div className="border border-slate-200 dark:border-white/20 rounded-xl flex items-center justify-center h-16 px-4">
        <span className="text-slate-900 dark:text-white font-bold text-lg tracking-wide">
          TaskFlow
        </span>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              isActive
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black"
                : "text-slate-500 border-slate-200 hover:text-slate-900 dark:text-white/70 dark:border-white/20 dark:hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              isActive
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black"
                : "text-slate-500 border-slate-200 hover:text-slate-900 dark:text-white/70 dark:border-white/20 dark:hover:text-white"
            }`
          }
        >
          <BarChart2 size={16} />
          Analysis
        </NavLink>
      </nav>

      {/* Theme toggle at the bottom */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 text-sm font-medium text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
      >
        <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
