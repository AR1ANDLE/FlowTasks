# FlowTasks

### Technical Documentation & Implementation Journal

A technical knowledge base documenting the technologies, libraries, React hooks, JavaScript concepts, components, and implementation decisions behind FlowTasks.

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Axios-HTTP%20Client-671DDF?logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="https://flowtasks-rho.vercel.app/">Live Demo</a> ·
  <a href="https://github.com/AR1ANDLE/FlowTasks">Repository</a>
</p>

---

<h2 align="center">Contents</h2>

| Section | Description |
|---|---|
| [Implementation Log](#-implementation-log) | Development history |

---

<h2 align="center">Implementation Log</h2>

### 01. `useFetch()` — Custom React Hook

Created a reusable custom React Hook to handle API data fetching across components.

**Technologies & Hooks:**
- `useState()` — Manages the fetched data, loading state and errors.
- `useEffect()` — Triggers the API request when the component mounts or its dependencies change.
- `axios` — Handles HTTP requests.
- `async/await` — Manages asynchronous operations.

**Purpose:**

Avoid repeating data-fetching logic across components by centralizing API requests and their associated states in one reusable hook.

**How it works:**

1. Initializes the data, loading and error states.
2. Executes the API request inside `useEffect()`.
3. Updates the data state when the request succeeds.
4. Captures errors if the request fails.
5. Updates the loading state when the operation finishes.
6. Returns the states so components can consume the fetched data.
