import { atom, Atom } from "jotai";

export const ATOMS = {
    voxelsCount: atom(0),
} as const satisfies Record<string, Atom<unknown>>;