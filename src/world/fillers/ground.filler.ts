import { isEqual } from "lodash";
import { TFiller } from "./filler";
import { GroundEntity } from "../entities/ground.entity";

export const GroundFiller: TFiller = {
    checkCriteria: (slot) => isEqual(slot.tags, ['world']),
    fill: () => new GroundEntity()
};
