import React, { useState } from "react";
import { CATEGORY, PRIORITY, type Task } from "../types";
import { DEFAULT_TASK_VALUES } from "../utils/constants";
import { generateTaskId } from "../utils/taskHelpers";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
  editingTask?: Task | null;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm transition border bg-white text-slate-900 border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 dark:bg-white/5 dark:text-white dark:border-white/15 dark:placeholder:text-white/30 dark:focus:border-white/40";

const optionClass = "bg-white text-slate-900 dark:bg-zinc-900 dark:text-white";

const labelClass =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-white/70";

const TaskForm = ({ editingTask, onSubmit, onClose }: TaskFormProps) => {
  const [formData, setFormData] = useState(editingTask || DEFAULT_TASK_VALUES);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (name === "title") {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    const now = Date.now();

    const task: Task = editingTask
      ? {
          ...formData,
          id: editingTask.id,
          createdAt: editingTask.createdAt,
          updatedAt: now,
        }
      : {
          ...formData,
          id: generateTaskId(),
          dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
          createdAt: now,
          updatedAt: now,
        };

    onSubmit(task);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-red-500">*</span>
        </label>

        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          className={`${inputClass} ${
            error ? "border-red-500 focus:border-red-500" : ""
          }`}
        />

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={inputClass}
        />
      </div>

      {/* Priority & Category */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="priority" className={labelClass}>
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value={PRIORITY.LOW} className={optionClass}>
              Low
            </option>

            <option value={PRIORITY.MEDIUM} className={optionClass}>
              Medium
            </option>

            <option value={PRIORITY.HIGH} className={optionClass}>
              High
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value={CATEGORY.WORK} className={optionClass}>
              Work
            </option>

            <option value={CATEGORY.PERSONAL} className={optionClass}>
              Personal
            </option>

            <option value={CATEGORY.OTHER} className={optionClass}>
              Other
            </option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className={labelClass}>
          Due Date
        </label>

        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`${inputClass} dark:[color-scheme:dark]`}
        />
      </div>

      {/* Show only while editing */}
      {editingTask && (
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/50 cursor-pointer">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="accent-violet-600"
          />
          Mark as completed
        </label>
      )}

      <button
        type="submit"
        className="w-full bg-violet-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-violet-700 transition cursor-pointer"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
