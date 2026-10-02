import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditingTodo, removeTodo } from "../features/todoSlice";
import type { AppDispatch, RootState } from "../store/store";

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-lg"
            key={todo.id}
          >
            <span className="text-white flex-1">{todo.text}</span>

            <div className="flex gap-2">
              <button
                onClick={() => dispatch(setEditingTodo(todo))}
                className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
