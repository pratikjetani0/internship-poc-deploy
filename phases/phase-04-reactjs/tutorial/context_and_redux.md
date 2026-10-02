# React State Management

# What is State Management?

State management is the process of handling data inside your application.

Examples:

- User authentication
- Theme mode (dark/light)
- Shopping cart
- Todo list
- Notifications

In React, state can be managed using:

- **useState** → local component state
- **Context API** → shared app state
- **Redux** → centralized global state
- **Redux Toolkit** → modern Redux

---

# Context API

## What is Context API?

Context API is React’s built-in feature for sharing state globally without prop drilling.

### Problem without Context

```tsx
App → Layout → Header → ThemeButton
```

If theme state is in App, it must be passed through all components.

This is called **prop drilling**.

Context solves this.

---

## Core Parts

### createContext()

Creates context.

### Provider

Provides state.

### useContext()

Consumes state.

---

# Theme Example using Context API

## Step 1: Create Theme Context

### ThemeContext.tsx

```tsx
import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
```

---

## Step 2: Theme Toggle Component

### ThemeToggle.tsx

```tsx
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
};

export default ThemeToggle;
```

---

## Step 3: Wrap App

### App.tsx

```tsx
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

export default App;
```

---

## Flow

1. Provider stores theme state
2. Components access it using useTheme()
3. toggleTheme updates state
4. All consumers re-render

---

## When to Use Context API

Use for:

- Theme
- Language
- Authentication
- Small shared state

# Redux Fundamentals

## What is Redux?

Redux is a centralized state management library.

It stores all app state in one store.

---

## Core Concepts

### Store

Central state container.

### Action

Describes what happened.

```ts
{
  type: "ADD_TODO";
}
```

### Reducer

Updates state based on action.

### Dispatch

Sends(dispatch) action to store.

### Selector

Reads state from store.

---

## Redux Flow

```text
Component → Dispatch Action → Reducer → Store Updates → UI Re-renders
```

---

## Problems with Traditional Redux

- Too much boilerplate
- Many files
- Verbose setup

This is why Redux Toolkit exists.

---

# Redux Toolkit (RTK)

## What is RTK?

Redux Toolkit is the official modern way to use Redux.

It simplifies:

- Store setup
- Reducers
- Actions
- Immutable updates

---

## Key Features

### configureStore()

Creates store.

### createSlice()

Creates reducers + actions.

### createAsyncThunk()

Handles async operations.

---

# 6. Todo App using Redux Toolkit

## Install

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Step 1: Create Slice

### features/todoSlice.ts

```tsx
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [{ id: 1, text: "Hello world" }],
};

const todoSlice = createSlice({
  name: "rtk-todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

---

## Step 2: Create Store

### app/store.ts

```tsx
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## Step 3: Wrap App with Provider

### main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

---

## Step 4: Add Todo Component

### TodoForm.tsx

```tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoForm;
```

---

## Step 5: Display Todos

### Todos.tsx

```tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeTodo } from "../features/todoSlice";

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
```

---

## Step 6: Use in App

### App.tsx

```tsx
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
```

---

## How RTK Works Internally

When user clicks Add:

```text
dispatch(addTodo("Learn Redux"))
↓
Reducer updates state
↓
Store updates
↓
Component re-renders
```

---

# Context API vs Redux vs RTK

| Feature          | Context API | Redux      | RTK        |
| ---------------- | ----------- | ---------- | ---------- |
| Built into React | Yes         | No         | No         |
| Boilerplate      | Low         | High       | Low        |
| Best for         | Small apps  | Large apps | Large apps |
| DevTools         | No          | Yes        | Yes        |
| Async support    | Manual      | Middleware | Easy       |
