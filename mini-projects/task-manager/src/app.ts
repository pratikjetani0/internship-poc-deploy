import { renderForm } from "./ui/form.js";
import { renderBoard } from "./ui/board.js";
import type { Task } from "./types/index.js";
import { Toast } from "./ui/Toast.js";
import { saveTasks, loadTasks } from "./utils/storage.js";

const app = document.getElementById("app")!;
const modal = document.getElementById("formModal")!;
const modalWrapper = document.getElementById("modalWrapper")!;
const backdrop = document.getElementById("modalBackdrop")!;
const openBtn = document.getElementById("openFormBtn")!;

backdrop.addEventListener("click", closeModal);

const toast = new Toast();

// store tasks
const tasks: Task[] = loadTasks(); // load tasks

// container
const boardContainer = document.createElement("div");

// add to DOM
app.appendChild(boardContainer);

// Open pop
openBtn.addEventListener("click", () => {
  openModal();

  // render form
  renderForm(modal);
});

// delete task
export function handleDelete(id: string) {
  const index = tasks.findIndex((t) => t.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);

    saveTasks(tasks); // ✅ update storage
    renderBoard(boardContainer, tasks);

    toast.show("Task deleted 🗑️", "warning");
  }
}

//edit task
export function handleEdit(task: Task) {
  openModal();

  // render form
  renderForm(modal, task);
}

// add task 
export function handleAdd(task: Task) {
  tasks.push(task);

  saveTasks(tasks);
  renderBoard(boardContainer, tasks);

  toast.show("Task added successfully ✅", "success");

  closeModal();
}

// handle edit and submit task
export function handleEditSubmit(newTask: Task) {
  const index = tasks.findIndex((t) => t.id === newTask.id);

  if (index !== -1) {
    tasks[index] = newTask;

    saveTasks(tasks);
    renderBoard(boardContainer, tasks);

    toast.show("Task updated successfully ✅", "success");
  }

  closeModal();
}

// open form model
function openModal() {
  modalWrapper.classList.remove("hidden");
  modal.classList.remove("translate-x-full");
}

// close form model
function closeModal() {
  modal.classList.add("translate-x-full");

  setTimeout(() => {
    modalWrapper.classList.add("hidden");
  }, 300);
}

// initial render
renderBoard(boardContainer, tasks);
