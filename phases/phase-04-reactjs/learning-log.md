# Learning Log

## 📅 Date: 2026-05-07

### 📚 Topics Learned

- Start React basic from tutorial
- mini project Chatbot

---

### 💡 Key Concepts

- state and props , Components, Hooks(useState, useEffect, useRef)
- How to use hook in project and what effect is done after used

---

### 🧠 What I Understood Well

- where to declare the hook and also not use in if or loop
- How JSX render the Javascript and HTML in web page

### ⚠️ Challenges Faced

- In chatbot auto scroll and also remove scroll from window
- Close chatbot when click outside

---

### 🔍 How I Solved Them

- scroll properties by using tailwind properties
- Using useRef and useEffect hooks

---

### 📌 Pending Doubts

No Doubts

---

### 🚀 Next Plan

- Strating React build project and go deep in to

## 📅 Date: 2026-05-08

### 📚 Topics Learned

- Chatbot UI improvement
- React project structure, Routing and its hooks, Outlet
- One example of Generic which is ApiPost(login and signup)

---

### 💡 Key Concepts

- react router dom used and define with outlet
- code spitting is more imporatant

---

### 🧠 What I Understood Well

- code spitting is more imporatant
- routing in react with BrowserRouter, Routes and Route

### ⚠️ Challenges Faced

- Outlet not proper understand

---

### 🔍 How I Solved Them

- Askin the chatgpt and with example through

---

### 📌 Pending Doubts

In chatbot if we add api, how we can implement that that AI response comes in limited the context and if user ask that outside context that decline to answer

---

### 🚀 Next Plan

- Finish course and then start the react POCs

## 📅 Date: 2026-05-11

### 📚 Topics Learned

- Built **POC 1: Product Listing & Cart System**
- API data sanitization
- Props drilling
- Dynamic routing with React Router DOM

---

### 💡 Key Concepts

- React Router DOM with `Routes`, `Route`, and `Outlet`
- State lifting
- Prop drilling
- localStorage data persistence
- Conditional rendering
- Skeleton loading improves UX over spinner
- Code splitting importance for optimization

---

### 🧠 What I Understood Well

- Routing in React using `BrowserRouter`, `Routes`, and `Route`
- Cart add/update/remove logic
- Wishlist toggle logic
- How props pass data through components

---

### ⚠️ Challenges Faced

- Understanding `Outlet`
- Managing shared cart state
- Handling API messy product data
- Quantity update bug in cart

---

### 🔍 How I Solved Them

- Moved shared state to `App.tsx`
- Used filtering to sanitize API data
- Learned through implementation and testing

---

### 📌 Pending Doubts

- In chatbot, if API is connected, how to restrict AI responses to limited context only
- How Context API works compared to prop drilling

---

### 🚀 Next Plan

- Finish React course
- Start more React POCs
- Learn Context API

## 📅 Date: 2026-05-12

### 📚 Topics Learned

- Improvment on POC1 : Custom Hook and Route Sepration
- Built **POC 2: Enhanced Todo & Productivity Tracker**
- Controlled forms in React
- Props drilling

---

### 💡 Key Concepts

- Controlled components using `useState`
- Handling multiple form inputs with one `handleChange`
- Form pre-filling for edit mode
- Custom hooks for persistent state

---

### 🧠 What I Understood Well

- How form state works in React
- Parent manages main task state
- Child component sends data back using props
- How reusable form logic works

---

### ⚠️ Challenges Faced

- Understanding dynamic form updates
- Add vs Edit logic confusion
- Why `key` prop was needed

---

### 🔍 How I Solved Them

- Traced data flow step by step
- Practiced parent-child communication logic
- Compared create vs update task behavior
- Learned through implementation and explanation

---

### 📌 Pending Doubts

- When to use Context API instead of props drilling
- `useReducer` vs `useState`
- React re-render optimization

---

### 🚀 Next Plan

- Complete remaining Task Manager features
- Learn Context API
- Start next React POC

## 📅 Date: 2026-05-13

### 📚 Topics Learned

- Improved **POC 2: Enhanced Todo & Productivity Tracker**
- Built **Analytics Dashboard**
- Integrated **Recharts** for data visualization
- Improved dashboard layout architecture

---

### 💡 Key Concepts

- React Context API with `createContext`
- Layout separation using shared app shell
- Dynamic conditional styling in React

---

### 🧠 What I Understood Well

- How Context API removes prop drilling
- How custom hooks simplify context usage
- How analytics data is transformed for charts

---

### ⚠️ Challenges Faced

- Duplicate header/layout structure issue
- Understanding chart data format

---

### 🔍 How I Solved Them

- Separated dashboard toolbar from app layout
- Practiced chart data transformation logic

---

### 📌 Pending Doubts

- Best practices for scaling Context API
- Optimizing re-renders in context-based apps

---

### 🚀 Next Plan

- Complete dark mode polish across all components
- Add category analytics chart
- Refactor repeated styling logic

## 📅 Date: 2026-05-14

### 📚 Topics Learned

- Learned **Context API, Redux, and Redux Toolkit**
- Built **Theme Switcher using Context API** in POC2
- Built **Todo App using Redux Toolkit**

---

### 💡 Key Concepts

- `createContext`, Provider, `useContext`
- Redux store, actions, reducers
- `createSlice()` and `configureStore()`
- Global state management patterns

---

### 🧠 What I Understood Well

- How Context API works for shared state
- Difference between Redux and Redux Toolkit
- How dispatch updates global state

---

### ⚠️ Challenges Faced

- Understanding Redux flow
- Connecting store with React components

---

### 🔍 How I Solved Them

- Practiced Todo example step by step
- Compared Context API vs RTK implementation

---

### 📌 Pending Doubts

- When to choose Context vs RTK
- Advanced RTK patterns

---

### 🚀 Next Plan

- Improve mini project using RTK
- Practice async state management

## 📅 Date: 2026-05-15

### 📚 Topics Learned

- worked on redux todo - edit feature
- Worked on **Authentication flow using localStorage**
- Implemented **Signup/Login state persistence**
- Built **conditional UI rendering based on auth state**

---

### 💡 Key Concepts

- `localStorage.getItem()` / `setItem()`
- Custom hooks for persistent state
- Conditional rendering in React
- Showing/hiding components based on login status
- useEffect warning
- Context vs Redux

---

### 🧠 What I Understood Well

- Why use Redux(RTK)?
- Managing auth state in React
- Conditionally rendering Login/Signup buttons
- Displaying profile info dynamically after login

---

### ⚠️ Challenges Faced

- Calling setState synchronously within an effect
- Handling UI updates after login/logout
- Making sure navbar updates instantly

---

### 🔍 How I Solved Them

- For effect used the key
- Used custom `useLocalStorage` hook
- Connected auth state with component rendering
- Tested login/logout flow repeatedly

---

### 📌 Pending Doubts

- Whether to use Context API or Redux for authentication

---

### 🚀 Next Plan

- Add protected routes
- Build profile dropdown functionality
- Complete POC3

## 📅 Date: 2026-05-18

### 📚 Topics Learned

- Built working **Test page**, **History page**, **Leaderboard page**, **result screen UI** for POC3
- Calculated and displayed:
  - WPM
  - CPM
  - Accuracy
  - Mistakes
- Implemented per logged-in user history
- Sorted leaderboard by WPM
- Created and practiced:
  - Auth Slice
  - Result Slice
  - Store setup
  - `createSlice`
  - Actions
  - Reducers
- Understood **RTK vs React Query**
- Learned **Client State vs Server State**

---

### 💡 Key Concepts

- Redux Toolkit state flow
- Random data rendering
- `reduce()` usage
- User-based filtering
- Result calculation logic
- Slice architecture

---

### 🧠 What I Understood Well

- Managing auth state with Redux
- Result state handling
- Showing user-specific history
- Leaderboard sorting logic

---

### ⚠️ Challenges Faced

- Result calculations
- History filtering per user
- Best score extraction
- State structure planning

---

### 🔍 How I Solved Them

- Used Redux slices for state separation
- Used `reduce()` for best score
- Used sorting for leaderboard ranking
- Connected auth state with result history

---

### 📌 Pending Doubts

- Advanced optimization for state management

---

### 🚀 Next Plan

- Complete POC3 polish

## 📅 Date: 2026-05-19

### 📚 Topics Learned

- Migrated **TypeRush** from custom hook state management to **Redux Toolkit**
- Configured Redux store
- Created and integrated:
  - **Auth Slice**
  - **Result Slice**
- Added **mechanical keyboard sound feedback** for correct keypress

---

### 💡 Key Concepts

- Redux store architecture
- Slice-based state management
- `createSlice()`
- Reducers and actions
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- Browser audio handling in React
- Audio playback reset using:
  - `pause()`
  - `currentTime`
  - `play()`

---

### 🧠 What I Understood Well

- Why Redux Toolkit is useful for centralized state
- Difference between custom hooks and Redux state management
- Result state management using slices

---

### ⚠️ Challenges Faced

- Understanding why Redux was needed when custom hooks already worked
- Debugging hidden textarea behavior
- Understanding Redux vs React Query differences

---

### 🔍 How I Solved Them

- Compared local hook state vs global Redux state flow
- Corrected hidden textarea styling issues
- Mapped app state responsibilities to proper Redux slices

---

### 📌 Pending Doubts

- Async Redux logic
- When Redux Toolkit should be preferred over React Query

---

### 🚀 Next Plan

- Start Phase_05 : Database
