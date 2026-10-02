import React from "react";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

const App = () => {
  const editingTodo = useSelector(
    (state: RootState) => state.todos.editingTodo,
  );
  return (
    <div className="min-h-screen bg-zinc-900 flex justify-center pt-20">
      <div className="w-full max-w-xl">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          Redux Toolkit Todo
        </h1>

        <TodoForm key={editingTodo?.id || "new"} />
        <Todos />
      </div>
    </div>
  );
};

export default App;
