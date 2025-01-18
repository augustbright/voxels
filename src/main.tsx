import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./components/Providers.tsx";

createRoot(document.getElementById("root")!).render(
    <Providers>
        <App />
    </Providers>
);
