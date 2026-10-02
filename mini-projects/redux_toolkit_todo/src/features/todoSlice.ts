import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string | number;
  text: string;
}

interface TodoState {
  todos: Todo[];
  editingTodo: Todo | null;
}

const initialState: TodoState = {
  todos: [{ id: 1, text: "Hello world" }],
  editingTodo: null,
};

export const todoSlice = createSlice({
  name: "rtk-todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };

      state.todos.push(todo);
    },
    removeTodo: (state, action: PayloadAction<string | number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string | number; text: string }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
        state.editingTodo = null;
      }
    },
    setEditingTodo: (state, action: PayloadAction<Todo>) => {
      state.editingTodo = action.payload;
    },
  },
});

export const { addTodo, removeTodo, editTodo, setEditingTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
