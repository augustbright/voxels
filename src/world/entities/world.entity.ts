import * as THREE from "three";

import { TSlot } from "../slot";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TScene } from "../../engine/scene";
import { fillersRegistry } from "../fillers/registry";

export class WorldEntity extends AbstractWorldEntity {
    constructor(private readonly slotSize: TSlot['size']) {
        super();
    }

    defineSlots(): TSlot[] {
        return [{
            position: new THREE.Vector3(0, 0, 0),
            size: this.slotSize,
            tags: ['world']
        }];
    }

    defineModel() {
        return [];
    }
}

export const createWorld = async ({
    slotSize,
    scene
}: {
    slotSize: TSlot['size'];
    scene: TScene;
}) => {
    const world = new WorldEntity(slotSize);
    world.generate({
        position: new THREE.Vector3(0, 0, 0),
        size: slotSize,
        tags: []
    }, scene, fillersRegistry);

    // fill in the world with stuff

    return world;
};