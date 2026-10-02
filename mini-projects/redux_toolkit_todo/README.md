# Redux Toolkit Todo App

A simple and modern Todo application built using **React, TypeScript, Redux Toolkit, and Tailwind CSS**.

This project demonstrates how to manage global state using Redux Toolkit while implementing core CRUD functionality for todos.

---

## Features

- Add new todos
- Edit existing todos
- Delete todos
- Global state management using Redux Toolkit
- Type safety with TypeScript
- Styled using Tailwind CSS
- Optimized form re-rendering using React `key`

---

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- Tailwind CSS
- Vite

---

## Project Structure

```bash
src/
│
├── components/
│   ├── TodoForm.tsx
│   └── Todos.tsx
│
├── features/
│   └── todoSlice.ts
│
├── store/
│   └── store.ts
│
├── App.tsx
└── main.tsx
```

---

## How It Works

### 1. Global State with Redux Toolkit

The app uses Redux Toolkit to manage todo state.

State structure:

```ts
{
  todos: [],
  editingTodo: null
}
```

---

### 2. Add Todo

Users can add new todos through the input form.

Redux action:

```ts
addTodo();
```

---

### 3. Edit Todo

When clicking the Edit button:

- Selected todo is stored in `editingTodo`
- Form input is populated automatically
- User can update todo text

Redux actions:

```ts
setEditingTodo();
editTodo();
```

---

### 4. Delete Todo

Users can remove todos instantly.

Redux action:

```ts
removeTodo();
```

---

## Important React Optimization

This project avoids unnecessary `useEffect()` state synchronization.

Instead of this:

```tsx
useEffect(() => {
  if (editingTodo) {
    setInput(editingTodo.text);
  }
}, [editingTodo]);
```

The app uses:

```tsx
<TodoForm key={editingTodo?.id || "new"} />
```

### Why?

Changing the `key` forces React to remount the component.

This allows:

```tsx
const [input, setInput] = useState(editingTodo?.text || "");
```

to initialize correctly without triggering cascading renders.

This is a cleaner React pattern.

---

## Redux Slice Actions

### Add Todo

```ts
addTodo(text);
```

Creates a new todo using `nanoid()`.

---

### Remove Todo

```ts
removeTodo(id);
```

Deletes todo by id.

---

### Edit Todo

```ts
editTodo({ id, text });
```

Updates existing todo text.

---

### Set Editing Todo

```ts
setEditingTodo(todo);
```

Stores selected todo for editing.

---

## Installation

### Install Dependencies

```bash
npm install
```

---

### Run Development Server

```bash
npm run dev
```

---

## Learning Concepts Covered

- Redux Toolkit setup
- Creating slices
- Reducers
- Dispatching actions
- Selecting state with `useSelector`
- Using `useDispatch`
- TypeScript with Redux
- Avoiding unnecessary `useEffect`

---

## Future Improvements

Possible upgrades:

- LocalStorage persistence
- Mark todo as completed
- Filter todos
- Search todos
- Dark/Light mode
- Drag and drop sorting

---

## Author

**Pratik Jetani**
