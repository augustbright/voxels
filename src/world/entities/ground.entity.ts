import { times } from "lodash";
import { TVoxelModel } from "../../engine/voxel";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TSlot } from "../slot";

export class GroundEntity extends AbstractWorldEntity {
    defineSlots(ownSlot: TSlot): TSlot[] {
        return [{
            position: new THREE.Vector3(ownSlot.position.x, ownSlot.position.y + 1, ownSlot.position.z),
            size: new THREE.Vector3(ownSlot.size.x, ownSlot.size.y - 1, ownSlot.size.z),
            tags: [],
            parent: ownSlot
        }];
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