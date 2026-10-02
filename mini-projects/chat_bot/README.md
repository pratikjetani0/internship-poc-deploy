# Chatbot App

A modern chatbot interface built using **React + TypeScript + Vite + Tailwind CSS v4**.

This project demonstrates building an interactive chatbot UI with:

- Floating chatbot toggle button
- Open / close animation
- Auto-scroll on new messages
- Outside click detection
- Responsive dark glassmorphism UI

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Supersimpledev Chatbot Package

---

## Features

### Floating Chat Button

Users can open and close the chatbot using the floating action button.

---

### Smooth Open / Close Animation

The chatbot popup uses smooth scaling and fade transitions.

---

### Auto Scroll

Whenever a user sends a message or the bot replies, the chat automatically scrolls to the latest message.

---

### Outside Click Detection

Clicking outside the chatbot closes the popup automatically.

---

### Responsive Design

The chatbot adapts across different screen sizes.

## Project Structure

```bash
src/
│
├── assets/
│   ├── bot.png
│   ├── profile.jpg
│   └── loading-spinner.gif
│
├── components/
│   ├── ChatInput.tsx
│   ├── ChatMessageUi.tsx
│   └── ChatMessages.tsx
│
├── types/
│   └── chat.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd chatbot-app
```

---

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

This project helped practice:

- React Component Architecture
- TypeScript Interfaces
- Props and State Management
- React Hooks
  - useState
  - useEffect
  - useRef
- Conditional Rendering
- Event Handling
- Tailwind Styling
- Responsive UI Design

---

## Future Improvements

Potential upgrades:

- Connect to real AI APIs (OpenAI / Gemini / Groq)
- Save chat history using localStorage

---

## Author

**Pratik Jetani**

