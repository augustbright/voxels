import { useEffect, useState } from "react";
import { TScene } from "./engine/scene";
import { GameMenu } from "./components/game-menu/GameMenu";
import { useMutation } from "@tanstack/react-query";
import { useScene } from "./components/contexts";
import { getDefaultStore } from "jotai";
import { ATOMS } from "./atoms";

const useGameInput = (scene: TScene) => {
    useEffect(() => {
        const onKeydown = (event: KeyboardEvent) => {
            switch (event.code) {
                case "KeyW":
                    scene.controls.input.forward = true;
                    break;
                case "KeyS":
                    scene.controls.input.backward = true;
                    break;
                case "KeyA":
                    scene.controls.input.left = true;
                    break;
                case "KeyD":
                    scene.controls.input.right = true;
                    break;
                case "Space":
                    scene.controls.input.jump = true;
                    break;
                case "ShiftLeft":
                    scene.controls.input.duck = true;
                    break;
            }
        };

        const onKeyup = (event: KeyboardEvent) => {
            switch (event.code) {
                case "KeyW":
                    scene.controls.input.forward = false;
                    break;
                case "KeyS":
                    scene.controls.input.backward = false;
                    break;
                case "KeyA":
                    scene.controls.input.left = false;
                    break;
                case "KeyD":
                    scene.controls.input.right = false;
                    break;
                case "Space":
                    scene.controls.input.jump = false;
                    break;
                case "ShiftLeft":
                    scene.controls.input.duck = false;
                    break;
            }
        };

        document.addEventListener("keydown", onKeydown);
        document.addEventListener("keyup", onKeyup);

        return () => {
            document.removeEventListener("keydown", onKeydown);
            document.removeEventListener("keyup", onKeyup);
        };
    }, [scene]);
};

const useLockPointer = (scene: TScene) => {
    const [isMenuOpen, setIsMenuOpen] = useState(!scene.controls.running);
    const lockPointerMutation = useMutation({
        mutationFn: () => scene.controls.lockPointer(),
    });

    const handleOnPlay = () => {
        lockPointerMutation.mutate();
    };

    useGameInput(scene);

    useEffect(() => {
        scene.controls.onUnlockPointer = () => {
            const keepRunning = getDefaultStore().get(ATOMS.keepRunning);
            if (keepRunning) return;
            scene.controls.running = false;
            setIsMenuOpen(true);
        };
        scene.controls.onLockPointer = () => {
            scene.controls.running = true;
            setIsMenuOpen(false);
        };

        const unassignCanvas = scene.assignCanvas(
            document.getElementById("canvas") as HTMLCanvasElement
        );

        return () => {
            unassignCanvas();
            scene.cleanUp();
        };
    }, [scene]);

    return {
        isMenuOpen,
        lockPointerMutation,
        handleOnPlay,
    };
};

function App() {
    const scene = useScene();
    const { handleOnPlay, isMenuOpen, lockPointerMutation } =
        useLockPointer(scene);

    useGameInput(scene);

    return (
        <div className="grow flex flex-col relative">
            <GameMenu
                isOpen={isMenuOpen}
                isPending={lockPointerMutation.isPending}
                onPlay={handleOnPlay}
            />
            <canvas className="grow !w-full" id="canvas" />
        </div>
    );
}

export default App;
