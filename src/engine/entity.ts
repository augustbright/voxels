import { Object3D } from 'three';
import { TVoxelModel } from './voxel';

let nextId = 0;

export class Entity {
    readonly id: number;
    model: TVoxelModel = [];
    object: Object3D | null = null;

    constructor() {
        this.id = nextId++;
    }

    process(delta: number) {
        if (this.update) {
            this.update(delta);
        }
    }

    // @ts-expect-error - this method is meant to be overridden
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(delta: number) {

    }
}
