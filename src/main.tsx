import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./components/Providers.tsx";
import { createScene } from "./engine/scene.ts";

import * as THREE from "three";
import { createWorld } from "./world/entities/world.entity.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).THREE = THREE;

const scene = createScene();
const world = createWorld({
    slotSize: new THREE.Vector3(300, 50, 300),
});

createRoot(document.getElementById("root")!).render(
    <Providers scene={scene} world={world}>
        <App />
    </Providers>
);
