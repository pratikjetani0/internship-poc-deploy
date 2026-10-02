import { Plus, Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddTask: () => void;
}

const Header = ({ onAddTask, searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-white/35" />
        <input
          type="search"
          placeholder="Search tasks…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white"
        />
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white"
      >
        <Plus size={18} />
        Add task
      </button>
    </header>
  );
};

export default Header;
