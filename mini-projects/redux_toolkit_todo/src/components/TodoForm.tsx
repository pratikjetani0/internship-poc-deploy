import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../features/todoSlice";
import type { RootState } from "../store/store";

const TodoForm = () => {
  const dispatch = useDispatch();

  const editingTodo = useSelector(
    (state: RootState) => state.todos.editingTodo,
  );
  const [input, setInput] = useState<string>(editingTodo?.text || "");

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (editingTodo) {
      dispatch(
        editTodo({
          id: editingTodo.id,
          text: input,
        }),
      );
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  // Error: Calling setState synchronously within an effect can trigger cascading renders
  // useEffect(() => {
  //   if (editingTodo) {
  //     setInput(editingTodo.text);
  //   } else {
  //     setInput("");
  //   }
  // }, [editingTodo]);

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="w-80 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
