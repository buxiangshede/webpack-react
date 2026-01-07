import "./style.css";
import "@rainbow-me/rainbowkit/styles.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {App} from "@/pages/App"

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <BrowserRouter>
		<App/>
		</BrowserRouter>
  );
}
