import { Calendar, Tag } from "lucide-react";
import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColor: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400",
  medium:
    "bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:text-amber-400",
  high: "bg-red-500/10 text-red-600 border border-red-500/20 dark:text-red-400",
};

const TaskCard = ({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: TaskCardProps) => {
  return (
    <div
      className={`flex min-h-[320px] flex-col justify-between rounded-3xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        task.completed
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
          : "border-slate-200 bg-white dark:border-white/10 dark:bg-[#141414]"
      }`}
    >
      {/* Top Content */}
      <div className="flex flex-1 flex-col">
        {/* Priority */}
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${priorityColor[task.priority]}`}
        >
          <span className="text-base leading-none">•</span>
          <span>{task.priority}</span>
        </div>

        {/* Title */}
        <h3
          title={task.title}
          className={`mt-4 text-[16px] font-semibold leading-6 break-words line-clamp-2 ${
            task.completed
              ? "text-slate-500 line-through dark:text-white/30"
              : "text-slate-800 dark:text-white"
          }`}
        >
          {task.title}
        </h3>

        {/* Description */}
        <p
          className={`mt-3 text-sm leading-6 break-words line-clamp-2 ${
            task.completed
              ? "text-slate-400 dark:text-white/25"
              : "text-slate-500 dark:text-white/45"
          }`}
        >
          {task.description ? task.description : "No description"}
        </p>

        {/* Push Metadata to Bottom */}
        <div className="mt-auto pt-5 space-y-2">
          {/* Category */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/50">
            <Tag size={15} className="shrink-0 opacity-70" />
            <span className="capitalize break-all">{task.category}</span>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/50">
            <Calendar size={15} className="shrink-0 opacity-70" />
            <span>{task.dueDate || "No due date"}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
        {/* Completed */}
        <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600 dark:text-white/45">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-4 w-4 cursor-pointer accent-violet-600"
          />
          Completed
        </label>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-xl border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-500 transition-all hover:border-red-500/40 hover:bg-red-500/10 dark:text-red-400 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
