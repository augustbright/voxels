import { createContext, useContext } from "react";
import { TScene } from "../engine/scene";
import { WorldEntity } from "../world/entities/world.entity";

export const SceneContext = createContext<TScene>(null as unknown as TScene);
export const WorldEntityContext = createContext<WorldEntity>(
    null as unknown as WorldEntity
);
export const useScene = () => useContext(SceneContext);
export const useWorldEntity = () => useContext(WorldEntityContext);
