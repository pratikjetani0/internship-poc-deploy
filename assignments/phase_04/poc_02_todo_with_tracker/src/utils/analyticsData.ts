import type { Task } from "../types";

export const getStatusChartData = (tasks: Task[]) => {
  const completed = tasks.filter((task) => task.completed).length;

  const pending = tasks.filter((task) => !task.completed).length;

  return [
    {
      name: "Completed",
      value: completed,
      fill: "#22c55e",
    },
    {
      name: "Pending",
      value: pending,
      fill: "#f59e0b",
    },
  ];
};

export const getPriorityChartData = (tasks: Task[]) => {
  const high = tasks.filter((task) => task.priority === "high").length;

  const medium = tasks.filter((task) => task.priority === "medium").length;

  const low = tasks.filter((task) => task.priority === "low").length;

  return [
    {
      name: "High",
      value: high,
      fill: "#ef4444",
    },
    {
      name: "Medium",
      value: medium,
      fill: "#f59e0b",
    },
    {
      name: "Low",
      value: low,
      fill: "#22c55e",
    },
  ];
};

export const getCategoryChartData = (tasks: Task[]) => {
  const work = tasks.filter((task) => task.category === "work").length;
  const personal = tasks.filter((task) => task.category === "personal").length;
  const other = tasks.filter((task) => task.category === "other").length;

  return [
    {
      name: "Work",
      value: work,
      fill: "#3b82f6",
    },
    {
      name: "Personal",
      value: personal,
      fill: "#ec4899",
    },
    {
      name: "Other",
      value: other,
      fill: "#6b7280",
    },
  ];
};
