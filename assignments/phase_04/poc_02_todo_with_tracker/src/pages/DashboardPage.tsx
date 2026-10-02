import { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import type { Task } from "../types";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterControls from "../components/FilterControls";
import { filterTasks } from "../utils/filterTasks";
import Header from "../components/Header";
import Layout from "../layout/Layout";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Toast } from "../utils/Toast";

const DashboardPage = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const toast = useMemo(() => new Toast(), []);

  const handleTaskSubmit = (task: Task) => {
    const exists = tasks.some((item) => item.id === task.id);
    setTasks((prev) => {
      if (exists) {
        return prev.map((item) => (item.id === task.id ? task : item));
      }

      return [...prev, task];
    });

    toast.show(
      exists ? "Task updated successfully" : "Task added successfully",
      "success",
    );

    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    setDeleteTaskId(id);
  };

  const confirmDelete = () => {
    if (!deleteTaskId) return;

    setTasks((prev) => prev.filter((task) => task.id !== deleteTaskId));

    toast.show("Task deleted successfully", "error");

    setDeleteTaskId(null);
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const isNowCompleted = !task.completed;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: isNowCompleted,
              updatedAt: Date.now(),
            }
          : task,
      ),
    );

    toast.show(
      isNowCompleted ? "Task marked completed" : "Task marked pending",
      "info",
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = filterTasks(tasks, {
    searchTerm,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleOpenModel = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400 sm:text-3xl">
          Dashboard
        </h1>

        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleOpenModel}
        />

        <TaskModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TaskForm
            key={editingTask?.id || "new-task"}
            onSubmit={handleTaskSubmit}
            onClose={handleCloseModal}
            editingTask={editingTask}
          />
        </TaskModal>

        <DeleteConfirmModal
          isOpen={!!deleteTaskId}
          onClose={() => setDeleteTaskId(null)}
          onConfirm={confirmDelete}
        />

        <FilterControls
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No tasks yet. Add one to get started.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
