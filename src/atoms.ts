import { atom, Atom } from "jotai";

const DEBUG_MODE = true;

export const ATOMS = {
    debugMode: atom(DEBUG_MODE),
    voxelsCount: atom(0),
    keepRunning: atom(DEBUG_MODE),
} as const satisfies Record<string, Atom<unknown>>;