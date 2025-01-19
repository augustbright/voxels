import { times } from "lodash";
import { TVoxelModel } from "../../engine/voxel";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TSlot } from "../slot";

export class GroundEntity extends AbstractWorldEntity {
    defineSlots() {
        return [];
    }

    defineModel(slot: TSlot) {
        const result: TVoxelModel = [];

        times(slot.size.x, (x) => {
            times(slot.size.z, (z) => {
                result.push({
                    position: new THREE.Vector3(x, slot.position.y, z),
                    color: new THREE.Color(0x503030)
                });
            });
        });

        return result;
    }
}