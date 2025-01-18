import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./components/Providers.tsx";
import { createScene } from "./engine/scene.ts";
import { createVoxelGrid } from "./engine/voxel.ts";

const scene = createScene();
createVoxelGrid(10).forEach((voxel) => scene.scene.add(voxel));

createRoot(document.getElementById("root")!).render(
    <Providers>
        <App scene={scene} />
    </Providers>
);
