interface FilterControlsProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

const priorityOptions = [
  { value: "all", label: "All Priority" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const categoryOptions = [
  { value: "all", label: "All Category" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "other", label: "Other" },
];

const sortOptions = [
  { value: "default", label: "Sort By" },
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
];

const FilterControls = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
}: FilterControlsProps) => {
  const selectClass =
    "flex-1 rounded-xl px-4 py-3 text-sm transition cursor-pointer appearance-none border bg-white text-slate-700 border-slate-200 focus:outline-none focus:border-violet-500 dark:bg-white/5 dark:text-white/70 dark:border-white/15 dark:focus:border-white/40";

  const optionClass =
    "bg-white text-slate-900 dark:bg-zinc-900 dark:text-white";

  const filters = [
    {
      value: statusFilter,
      onChange: setStatusFilter,
      options: statusOptions,
    },
    {
      value: priorityFilter,
      onChange: setPriorityFilter,
      options: priorityOptions,
    },
    {
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: categoryOptions,
    },
    {
      value: sortBy,
      onChange: setSortBy,
      options: sortOptions,
    },
  ];

  return (
    <div className="border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent rounded-2xl p-4 flex items-center gap-4 transition-colors">
      {filters.map((filter, index) => (
        <select
          key={index}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className={selectClass}
        >
          {filter.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={optionClass}
            >
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterControls;
