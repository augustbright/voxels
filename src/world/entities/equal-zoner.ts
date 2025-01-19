import { takeRandom } from "../../utils";
import { AbstractWorldEntity } from "../abstract-world-entity";
import { TSlot } from "../slot";

export class EqualZoner extends AbstractWorldEntity<{
    axis: 'x' | 'z';
}> {
    defineSlots(ownSlot: TSlot): TSlot[] {
        const parts = takeRandom([2, 3, 4]);
        const partSize = ownSlot.size[this.props.axis] / parts;

        const slots = Array.from({ length: parts }, (_, i) => {
            const position = ownSlot.position.clone();
            position[this.props.axis] += i * partSize;
            const size = new THREE.Vector3();
            size.copy(ownSlot.size);
            size[this.props.axis] = partSize;

            return {
                position,
                size,
                tags: [],
                parent: ownSlot
            };
        });

        return slots;
    }

    defineModel() {
        return [];
    }
}