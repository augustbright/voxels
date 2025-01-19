import { takeRandom } from "../../utils";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TSlot } from "../slot";

type TSplitter = (slot: TSlot) => TSlot[];

const splitters: TSplitter[] = [
    function sliceX(slot: TSlot) {
        const slice = takeRandom([0.3, 0.4, 0.5, 0.6, 0.7]);
        const sliceSize = Math.floor(slot.size.x * slice);
        return [
            {
                position: slot.position.clone(),
                size: new THREE.Vector3(sliceSize, slot.size.y, slot.size.z),
                tags: [],
                parent: slot
            },
            {
                position: slot.position.clone().add(new THREE.Vector3(sliceSize, 0, 0)),
                size: new THREE.Vector3(slot.size.x - sliceSize, slot.size.y, slot.size.z),
                tags: [],
                parent: slot
            }
        ];
    },
    function sliceZ(slot: TSlot) {
        const slice = takeRandom([0.3, 0.4, 0.5, 0.6, 0.7]);
        const sliceSize = Math.floor(slot.size.z * slice);
        return [
            {
                position: slot.position.clone(),
                size: new THREE.Vector3(slot.size.x, slot.size.y, sliceSize),
                tags: [],
                parent: slot
            },
            {
                position: slot.position.clone().add(new THREE.Vector3(0, 0, sliceSize)),
                size: new THREE.Vector3(slot.size.x, slot.size.y, slot.size.z - sliceSize),
                tags: [],
                parent: slot
            }
        ];
    }
];

export class SliceZoner extends AbstractWorldEntity<{
    axis: 'x' | 'z';
}> {
    defineSlots(ownSlot: TSlot): TSlot[] {
        return splitters[this.props.axis === 'x' ? 0 : 1](ownSlot);
    }

    defineModel() {
        return [];
    }
}