import { TSlot } from "../slot";
import { AbstractWorldEntity } from "../abstract-world-entity";

export type TFiller = {
    checkCriteria: (slot: TSlot) => boolean;
    fills: Array<(slot: TSlot) => AbstractWorldEntity>;
};