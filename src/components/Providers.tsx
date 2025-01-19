import { Theme } from "@radix-ui/themes";
import { PropsWithChildren, StrictMode } from "react";
import { DebuggerProvider } from "./debugger/DebuggerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TScene } from "../engine/scene";
import { WorldEntity } from "../world/entities/world.entity";
import { SceneContext, WorldEntityContext } from "./contexts";

const queryClient = new QueryClient();

export const Providers = ({
    children,
    scene,
    world,
}: PropsWithChildren<{ scene: TScene; world: WorldEntity }>) => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Theme className="flex flex-col">
                    <SceneContext.Provider value={scene}>
                        <WorldEntityContext.Provider value={world}>
                            <DebuggerProvider>{children}</DebuggerProvider>
                        </WorldEntityContext.Provider>
                    </SceneContext.Provider>
                </Theme>
            </QueryClientProvider>
        </StrictMode>
    );
};
