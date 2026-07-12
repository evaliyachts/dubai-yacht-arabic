import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { shouldHydrateRoot } from "./lib/hydration";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

if (shouldHydrateRoot(root)) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
