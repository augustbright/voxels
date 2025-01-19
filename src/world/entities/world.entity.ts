import * as THREE from "three";

import { TSlot } from "../slot";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TScene } from "../../engine/scene";
import { fillersRegistry } from "../fillers/registry";

export class WorldEntity extends AbstractWorldEntity<{
    rootSlot: TSlot;
}> {
    defineSlots(ownSlot: TSlot): TSlot[] {
        return [{
            position: new THREE.Vector3(0, 0, 0),
            size: this.props.rootSlot.size,
            tags: ['world'],
            parent: ownSlot
        }];
    }

    generateWorld(scene: TScene) {
        this.generate(this.props.rootSlot, scene, fillersRegistry);
    }

    defineModel() {
        return [];
    }
}

export const createWorld = ({
    slotSize,
}: {
    slotSize: TSlot['size'];
}) => {
    // @ts-expect-error - parent is defined later
    const rootSlot: TSlot = {
        position: new THREE.Vector3(0, 0, 0),
        size: slotSize,
        tags: [],
    };
    rootSlot.parent = rootSlot;

    const world = new WorldEntity({ rootSlot });


    return world;
};