import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/app.tsx";
import "./styles/globals.tailwind.css";
const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
