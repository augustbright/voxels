import { TFiller } from "./filler";
import { EqualZoner } from "../entities/equal-zoner";
import { SliceZoner } from '../entities/slice-zoner';
import { DebugSurfaceEntity } from "../entities/debug-surface.entity";

export const fillersRegistry: TFiller[] = [
    {
        checkCriteria: (slot) => slot.tags.includes('world') && slot.size.x > 50,
        fills: [
            () => new EqualZoner({
                axis: 'x',
                passTags: () => ['world']
            }),
            () => new SliceZoner({
                axis: 'x',
                passTags: () => ['world']
            }),
        ]
    },
    {
        checkCriteria: (slot) => slot.tags.includes('world') && slot.size.z > 50,
        fills: [
            () => new EqualZoner({
                axis: 'z',
                passTags: () => ['world']
            }),
            () => new SliceZoner({
                axis: 'z',
                passTags: () => ['world']
            }),
        ]
    },

    {
        checkCriteria: (slot) => slot.tags.includes('world'),
        fills: [
            () => new DebugSurfaceEntity({
                passTags: () => ['debug surface']
            }),
        ]
    },

];
