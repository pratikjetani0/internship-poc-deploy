# React

## React Basics & JSX

### What is React?

React is an **external library** that helps us create websites more easily. Two key ideas:

- **External library** — code written by someone else, loaded onto our website
- **Helps create websites easier** — provides tools to build, organise, and update UI

### External Libraries & the Script Element

We load JavaScript onto a page using the `<script>` element:

```html
<!-- Pattern 1: Inline Script -->
<script>
  console.log("hello");
</script>
```

> **Note:** React is split into two packages: `react` (shared) and `react-dom` (web-specific).

### What is JSX?

JSX (JavaScript XML) is an enhanced version of JavaScript that lets us write HTML directly inside JavaScript code.

```js
// Normal JavaScript (verbose)
const btn = document.createElement("button");
btn.textContent = "Hello";

// JSX (simple)
const btn = <button>Hello</button>;
```

JSX is **not** understood by browsers directly. We use **Babel** to translate JSX into normal JavaScript.

| Feature          | Details                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Babel            | JavaScript compiler that translates JSX to plain JS                 |
| `type` attribute | Add `type="text/babel"` on your `<script>` tag to trigger Babel     |
| Closing tags     | In JSX ALL elements need a closing tag or self-closing: `<input />` |

### Rendering Elements

```jsx
const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

// Render text
root.render("Welcome!");

// Render a single element
const btn = <button>Click me</button>;
root.render(btn);

// Render multiple elements — group in a div
const app = (
  <div>
    <button>Send</button>
    <p>Paragraph of text</p>
  </div>
);
root.render(app);
```

### Fragments

A **Fragment** groups elements without adding an extra DOM node.

```jsx
// Fragment syntax — no extra <div> in the DOM
const app = (
  <>
    <button>Send</button>
    <p>Paragraph of text</p>
  </>
);
```

### Inserting JavaScript Values into JSX

Use curly braces `{}` to embed any JavaScript expression inside JSX:

```jsx
const name = "Alice";
const element = (
  <p>
    Hello, {name}! 2 + 2 = {2 + 2}
  </p>
);
// Renders: Hello, Alice! 2 + 2 = 4
```

---

## Components & Props

### What is a Component?

A **component** is a reusable, self-contained unit of UI. Examples from the Chatbot project:

- `ChatInput` — the text box and Send button
- `ChatMessage` — a single chat message bubble with profile image
- `App` — the entire application (outermost component)

### Creating a Component

A React component is just a **function that returns JSX**. The function name **MUST** start with a capital letter (PascalCase).

```jsx
// ChatInput component
function ChatInput() {
  return (
    <div>
      <input placeholder="Send a message..." size="30" />
      <button>Send</button>
    </div>
  );
}
```

### Component Syntax

```jsx
// Function call syntax (not recommended)
root.render(ChatInput());

// Component syntax (recommended — creates a custom HTML element)
root.render(<ChatInput />);
```

### What are Props?

**Props** (properties) allow us to pass data into a component — just like HTML attributes.

```jsx
// Usage (like HTML attributes)
<ChatMessage message="Hello chatbot!" sender="user" />;

// Inside the component
function ChatMessage(props) {
  const message = props.message; // "Hello chatbot!"
  const sender = props.sender; // "user"
  return <div>{message}</div>;
}
```

### Destructuring Props (Shortcut)

```jsx
// Destructuring in the parameter (most common pattern)
function ChatMessage({ message, sender }) {
  return <div>{message}</div>;
}
```

### Generating Lists with `.map()`

```jsx
const chatMessages = [
  { id: "id1", message: "Hello chatbot!", sender: "user" },
  { id: "id2", message: "Hello! How can I help?", sender: "robot" },
];

// Generate components from data
const components = chatMessages.map((msg) => (
  <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
));
```

> **Rule:** When rendering a list of components, each must have a unique `key` prop. This helps React track changes efficiently.

### Conditional Rendering — Guard Operator (`&&`)

```jsx
// Show robot image only if sender is 'robot'
{
  sender === "robot" && <img src="robot.png" width="45" />;
}

// Show user image only if sender is 'user'
{
  sender === "user" && <img src="user.png" width="45" />;
}
```

## Chapter State & Event Handlers

### Event Handlers

An **event handler** is a function that runs when the user interacts with the page. React uses camelCase event props:

```jsx
function handleClick() {
  console.log("Button clicked!");
}

// Pass the function — do NOT call it with ()
<button onClick={handleClick}>Click me</button>

// Inline arrow function
<button onClick={() => console.log("clicked!")}>Click</button>
```

| Event Prop     | Fires When           |
| -------------- | -------------------- |
| `onClick`      | Element is clicked   |
| `onChange`     | Input value changes  |
| `onSubmit`     | Form is submitted    |
| `onMouseEnter` | Mouse enters element |
| `onKeyDown`    | Key is pressed       |

### Getting Input Text with `onChange`

```jsx
function saveInputText(event) {
  // event.target is the <input> element
  // event.target.value is the current text inside it
  console.log(event.target.value);
}

<input onChange={saveInputText} />;
```

### What is State?

**State** is data that is connected to the HTML. When you update state, React automatically updates the UI.

- Normal variable changed → UI does **NOT** update
- State updated via updater function → UI **DOES** update automatically

### `useState` Hook

```jsx
import { useState } from "react";

// Declare state with an initial value
const [chatMessages, setChatMessages] = useState([
  { id: "id1", message: "Hello!", sender: "user" },
]);

// Read  → use chatMessages
// Write → call setChatMessages(newArray)
```

`useState` returns an array with exactly two values:

- **Index 0** — the current state value
- **Index 1** — the updater function (naming convention: `set` + StateName)

### Updating State (Spread Operator Pattern)

> **Never mutate state directly. Always create a new copy.**

```jsx
// Add a new chat message
function sendMessage() {
  const newMessages = [
    ...chatMessages, // copy existing messages
    {
      id: crypto.randomUUID(),
      message: inputText,
      sender: "user",
    },
  ];
  setChatMessages(newMessages); // triggers re-render
}
```

### Controlled Inputs

A **controlled input** means React drives the value of the `<input>` element.

```jsx
const [inputText, setInputText] = useState("");

<input value={inputText} onChange={(e) => setInputText(e.target.value)} />;

// Clear after send
setInputText(""); // next render empties the input
```

### Lifting State Up

When two sibling components need to share the same state, move the state to their **closest common ancestor** and pass it down via props.

```jsx
// App — parent holds shared state
function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <ProductList cart={cart} setCart={setCart} />
      <CartSummary cart={cart} />
    </>
  );
}
```

> **Pattern:** Lifting state up is a fundamental React pattern. Move state to the highest component that needs it, then pass it down as props.

---

## React Hook (useEffect & useRef)

### `useEffect` Hook

`useEffect` lets you run code **after a component is created or updated**.

```jsx
import { useEffect } from "react";

// Runs ONCE after component is created
useEffect(() => {
  console.log("Component mounted!");
}, []); // empty array = run once

// Runs every time chatMessages changes
useEffect(() => {
  // auto-scroll to bottom
  if (containerEl) containerEl.scrollTop = containerEl.scrollHeight;
}, [chatMessages]); // dependency array
```

> **Rule:** Do not put hooks inside `if` statements or loops. Hooks must always be called at the top level of a component function.

### `useRef` Hook

`useRef` stores a reference to a DOM element, giving you direct access without using the DOM manually.

## Routing with React Router

### What is Routing?

Routing lets you create **multiple pages** in a React app, each mapped to a URL path, all inside **ONE HTML file** (a Single Page Application — SPA).

- **Without routing:** Navigating between pages requires reloading the entire page
- **With routing:** React swaps components instantly using JavaScript — no reload

### Installing React Router

```bash
npm install react-router-dom
```

### Basic Router Setup

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="orders" element={<Orders />} />
    </Routes>
  );
}
```

### Route Props Reference

| Prop                      | Meaning                          |
| ------------------------- | -------------------------------- |
| `index`                   | Matches the root path `/`        |
| `path='/checkout'`        | Matches the URL path `/checkout` |
| `element={<Component />}` | Component to render at this path |

### The `Link` Component

```jsx
// ❌ Causes full page reload
<a href="/orders">Orders</a>;

// ✅ Fast client-side navigation
import { Link } from "react-router";
<Link to="/orders">Orders</Link>;
```

### `useNavigate` Hook

```jsx
import { useNavigate } from "react-router-dom";

function PaymentSummary() {
  const navigate = useNavigate();

  async function createOrder() {
    await axios.post("/api/orders");
    navigate("/orders"); // redirect after order is placed
  }
}
```

## Backend Integration & Data Fetching

### What is a Backend?

A backend is another computer (server) that manages all the data. Reasons to use a backend:

- Too much data to store on every visitor's device
- Data needs to be shared across many devices
- Calculations and business logic should live server-side

### Data Fetching — fetch API

```js
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Axios — Cleaner HTTP Requests

```bash
npm install axios
```

```js
import axios from "axios";

// GET request
const response = await axios.get("/api/products");
console.log(response.data); // the products array
```

### Async/Await with `useEffect`

> **Rule:** Never make the `useEffect` callback itself async. Create an inner async function and call it instead.

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    fetchData(); // call the inner async function
  }, []); // run once on mount

  return products.map((p) => <Product key={p.id} product={p} />);
}
```

## Data Mutation

### HTTP Request Types

| Method   | Purpose              |
| -------- | -------------------- |
| `GET`    | Read / fetch data    |
| `POST`   | Create new data      |
| `PUT`    | Update existing data |
| `DELETE` | Delete data          |

### Add to Cart (POST Request)

```js
async function addToCart() {
  await axios.post("/api/cart-items", {
    productId: product.id,
    quantity: quantity,
  });
  await loadCart(); // reload cart to update UI
}
```

### Update Delivery Option (PUT Request)

```js
async function updateDeliveryOption() {
  await axios.put(`/api/cart-items/${cartItem.productId}`, {
    deliveryOptionId: deliveryOption.id,
  });
  await loadCart();
}
```

> **Convention:** When updating or deleting, the ID is typically placed in the URL path: `/api/cart-items/:productId`.

### Delete Cart Item (DELETE Request)

```js
async function deleteCartItem() {
  await axios.delete(`/api/cart-items/${cartItem.productId}`);
  await loadCart();
}
```

### Create Order (POST + Navigate)

```jsx
import { useNavigate } from "react-router";

function PaymentSummary({ loadCart }) {
  const navigate = useNavigate();

  async function createOrder() {
    await axios.post("/api/orders");
    await loadCart(); // cart is now empty
    navigate("/orders"); // redirect to orders page
  }

  return <button onClick={createOrder}>Place Order</button>;
}
```

### Dependency Array & Derived Updates

```jsx
// Re-fetch payment summary whenever the cart changes
useEffect(() => {
  async function fetchCheckoutData() {
    const res = await axios.get("/api/payment-summary");
    setPaymentSummary(res.data);
  }
  fetchCheckoutData();
}, [cart]); // ← reruns when cart changes
```
