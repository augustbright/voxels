import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./components/Providers.tsx";
import { createScene } from "./engine/scene.ts";

import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).THREE = THREE;

const scene = createScene();

createRoot(document.getElementById("root")!).render(
    <Providers>
        <App scene={scene} />
    </Providers>
);
