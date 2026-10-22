import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./estilos.css";

const elemento = document.getElementById("root");

createRoot(elemento).render(<App />);
